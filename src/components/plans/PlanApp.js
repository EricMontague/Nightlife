import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import CreatePlan from "./CreatePlan";
import PlaceDetailsModal from "./PlaceDetailsModal";
import Map from "./Map";
import DocumentTitle from "../navigation/DocumentTitle";
import useModalState from "../../hooks/useModalState";
import useDiscoverState from "../../hooks/useDiscoverState";
import {addPlanDetails, updatePlanDetails} from "../../redux/actions/plan";
import {
  addPlace, 
  deletePlace, 
  fetchPlanAndPlaces, 
  setSelectedPlace, 
  setSortOrder,
  setPlaceList
} from "../../redux/actions/placeList";
import { addPlan, updatePlan } from "../../firebase/plans";
import { formatDate } from "../../utils/dateTimeHelpers";
import constants from "../../utils/constants";
import { enableScrollY} from "../../utils/commonHelpers";
import { removeGoogleScript, hasGoogleScript } from "../../utils/googleMapsHelpers";
import Poller from "../../utils/polling";
import { reorderPlaces } from "../../algorithms/reorder";
import sortRunner from "../../algorithms/sorting";


const PlanApp = props => {
    // Variable declarations
    splitPath = props.location.pathname.split("/");

    // Declare hooks
    const dispatch = useDispatch();
    const places = useSelector(state => state.placeListReducer.places);
    const selectedPlace = useSelector(state => state.placeListReducer.selectedPlace);
    const currentPlan = useSelector(state => state.planReducer.plan);
    const sortOrder = useSelector(state => state.placeListReducer.sortOrder);
    const [isPlaceModalVisiblesVisible, togglePlaceModal] = useModalState(false);
    const [discoverState, setDiscoverState] = useDiscoverState({
      isDiscoverView: false,
      discoverMode: splitPath[this.splitPath.length - 1]
    })
    const [mousedOverPlaceId, setMousedOverPlaceId] = useState("");


    // componentDidMount
    useEffect(() => {
      console.log("PlanApp mount");
        // User is on the editting page
        const page = splitPath[splitPath.length - 1];
        if (
          page === constants.DISCOVER_MODE.EDIT ||
          page === constants.DISCOVER_MODE.VIEW
        ) {
          const planId = splitPath[2];
          const poller = new Poller(3000, 3);
          poller.start(fetchPlanAndPlaces, [currentUser.userId, planId]);
        }

        // Cleanup scripts
        return () => {
          console.log("PlanApp unmount");
          enableScrollY();
          const urlParameters = ["libraries=" + constants.GOOGLE_LIBRARIES.places];
          if (hasGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters)) {
            removeGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters);
          }
        }
        
    }, []);


    // componentDidUpdate
    useEffect(() => {
        console.log("PlanApp update");
        this.splitPath = props.location.pathname.split("/");
        const mode = splitPath[splitPath.length - 1];
        if (discoverState.discoverMode !== mode) {
          resetState();
        }
        
      }, [])
    
     
    const resetState = () => {
      togglePlaceModal(false);
      setDiscoverState({
        isDiscoverView: false,
        discoverMode: splitPath[this.splitPath.length - 1]
      })
      dispatch(setSelectedPlace(null));
      dispatch(setSortOrder(""))
      const defaultPlan = {
        planId: "",
        title: "",
        description: "",
        date: formatDate(new Date()),
        time: new Date().toTimeString().slice(0, 5)
      };
      dispatch(addPlanDetails(defaultPlan))
      dispatch(setPlaceList([]))
    }
  
    // Declare callbacks
    const addPlandDetailsHandler = plan => {
      dispatch(addPlanDetails(plan));
    }

    const updatePlanDetailsHandler = plan => {
      dispatch(updatePlanDetails(plan));
    };

    const addPlaceHandler = (placeResults, input) => {
      dispatch(addPlace(placeResults, input));
    }

    const deletePlaceHandler = placeId => {
      dispatch(deletePlace(placeId));
    }

    const setSortOrderHandler = sortOrder => {
      dispatch(setSortOrder(sortOrder));
    }

    // Needed so that I can get places out of firebase in the same order
  // They were in when I inserted them
  const addSortKey = places => {
    return places.map((place, index) => {
      return { placeId: place.placeId, sortKey: index };
    });
  };

      // Google doesn't allow storage of Places API data for more than 30 days,
  // with the sole exception being the the placeId attribute.
  // Based on their terms and conditions, the placeId can be stored indefinitely
  // https://developers.google.com/places/web-service/policies
  const storePlanInFirestore = async () => {
    if (places.length === 0) {
      console.log("Please choose at least one place.");
    } else {
      const plan = { ...currentPlan };
      plan.places = addSortKey(places);
      try {
        await addPlan(currentUser.userId, plan);
      } catch (error) {
        console.log(`Error in saving plan information: ${error.message}`);
      }
      props.history.push(`/users/${currentUser.displayName}`);
    }
  }

  const updatePlanInFirestore = async () => {
    if (places.length === 0) {
      console.log("Please choose at least one place.");
    } else {
      const plan = { ...currentPlan };
      plan.places = addSortKey(places);
      try {
        await updatePlan(currentUser.userId, plan);
      } catch (error) {
        console.log(`Error in updating plan information: ${error.message}`);
      }
      props.history.push(`/users/${currentUser.displayName}`);
    }
  }

    const togglePlaceModalHandler = place => {
      togglePlaceModal(!isPlaceModalVisiblesVisible);
      setSelectedPlace(selectedPlace ? null : place);
    }

    const handleMarkerMouseover = placeId => {
      setMousedOverPlaceId(placeId);
    }
  
    const handleMarkerMouseout = () => {
      setMousedOverPlaceId("");
    };

    const toggleView = () => {
      setDiscoverState({
        ...discoverState,
        isDiscoverView: !isDiscoverView
      })
    }

    const dragEndHandler = result => {
      const { destination, source } = result;
  
      // dropped outside of list
      if (!destination) {
        return;
      }
  
      // reorder places array
      const reorderedPlaces = reorderPlaces(
        places,
        source.index,
        destination.index
      );
  
      // set state
      dispatch(setSortOrder(constants.SORT_BY_USER_INPUT))
      dispatch(setPlaceList(reorderPlaces));
    }
    
  
    

    const sortPlaces = places => {
      return sortRunner(places, sortOrder);
    };  

    // Sort places
    const sortedPlaces = sortPlaces(places);

    return (
      <DocumentTitle
        title={`${discoverState.discoverMode[0].toUpperCase() +
          discoverState.discoverMode.slice(1)} Plan | Nightlife`}
      >
        <>
          <div className="discover-container">
            <div className="google-map">
              <Map
                toggleModal={togglePlaceModalHandler}
                places={sortedPlaces}
                shouldRenderMarkers={
                  discoverState.isDiscoverView ||
                  discoverState.discoverMode === constants.DISCOVER_MODE.VIEW
                }
                handleMouseover={handleMarkerMouseover}
                handleMouseout={handleMarkerMouseout}
              />
            </div>
            <div className="user-actions">
              <CreatePlan
                addPlace={addPlaceHandler}
                deletePlace={deletePlaceHandler}
                setPlanDetails={
                  discoverState.discoverMode === constants.DISCOVER_MODE.CREATE
                    ? addPlandDetailsHandler
                    : updatePlanDetailsHandler
                }
                updatePlan={updatePlanInFirestore}
                storePlan={storePlanInFirestore}
                toggleView={toggleView}
                toggleModal={togglePlaceModalHandler}
                places={sortedPlaces}
                isDiscoverView={discoverState.isDiscoverView}
                plan={currentPlan}
                discoverMode={discoverState.discoverMode}
                changeSortOrder={setSortOrderHandler}
                dragEndHandler={dragEndHandler}
                mousedOverPlaceId={mousedOverPlaceId}
              />
            </div>
          </div>
          {isPlaceModalVisible && (
            <PlaceDetailsModal
              place={selectedPlace}
              toggleModal={togglePlaceModalHandler}
            />
          )}
        </>
      </DocumentTitle>
    );
  }
};

PlanApp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }),
  history: PropTypes.shape({
    length: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      hash: PropTypes.string.isRequired,
      state: PropTypes.objectOf(PropTypes.string.isRequired)
    }),
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    block: PropTypes.func.isRequired
  }),
  location: PropTypes.shape({
    key: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
  })
};

export default PlanApp;



// class PlanApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.splitPath = this.props.location.pathname.split("/");
//     this.state = {
//       isPlaceModalVisible: false,
//       isDiscoverView: false,
//       discoverMode: this.splitPath[this.splitPath.length - 1],
//       selectedPlace: null,
//       mousedOverPlaceId: "",
//       sortOrder: "",
//       plan: {
//         planId: "",
//         title: "",
//         description: "",
//         date: formatDate(new Date()),
//         time: new Date().toTimeString().slice(0, 5)
//       },
//       places: []
//     };
//     this.getInitialState = this.getInitialState.bind(this);
//     this.fetchPlan = this.fetchPlan.bind(this);
//     this.fetchPlaces = this.fetchPlaces.bind(this);
//     this.setInitialState = this.setInitialState.bind(this);
//     this.addPlace = this.addPlace.bind(this);
//     this.updatePlan = this.updatePlan.bind(this);
//     this.deletePlace = this.deletePlace.bind(this);
//     this.addPlanDetails = this.addPlanDetails.bind(this);
//     this.updatePlanDetails = this.updatePlanDetails.bind(this);
//     this.storePlan = this.storePlan.bind(this);
//     this.addSortKey = this.addSortKey.bind(this);
//     this.toggleView = this.toggleView.bind(this);
//     this.togglePlaceModal = this.togglePlaceModal.bind(this);
//     this.changeSortOrder = this.changeSortOrder.bind(this);
//     this.sortPlaces = this.sortPlaces.bind(this);
//     this.dragEndHandler = this.dragEndHandler.bind(this);
//     this.handleMarkerMouseover = this.handleMarkerMouseover.bind(this);
//     this.handleMarkerMouseout = this.handleMarkerMouseout.bind(this);
//   }

//   static contextType = AuthContext;

//   componentDidMount() {
//     console.log("PlanApp mount");
//     // User is on the editting page
//     const page = this.splitPath[this.splitPath.length - 1];
//     if (
//       page === constants.DISCOVER_MODE.EDIT ||
//       page === constants.DISCOVER_MODE.VIEW
//     ) {
//       const planId = this.splitPath[2];
//       const poller = new Poller(3000, 3);
//       poller.start(this.getInitialState, [planId]);
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     console.log("PlanApp update");
//     this.splitPath = this.props.location.pathname.split("/");
//     const mode = this.splitPath[this.splitPath.length - 1];
//     if (prevState.discoverMode !== mode) {
//       this.setState({
//         isPlaceModalVisible: false,
//         isDiscoverView: false,
//         discoverMode: mode,
//         selectedPlace: null,
//         sortOrder: "",
//         plan: {
//           planId: "",
//           title: "",
//           description: "",
//           date: formatDate(new Date()),
//           time: new Date().toTimeString().slice(0, 5)
//         },
//         places: []
//       });
//     }
//   }

//   componentWillUnmount() {
//     console.log("PlanApp unmount");
//     enableScrollY();
//     const urlParameters = ["libraries=" + constants.GOOGLE_LIBRARIES.places];
//     if (hasGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters)) {
//       removeGoogleScript(constants.GOOGLE_MAPS_SCRIPT_URL, urlParameters);
//     }
//   }

//   async getInitialState(planId) {
//     try {
//       const userId = this.context.currentUser.userId;
//       const plan = await this.fetchPlan(userId, planId);
//       this.setState({
//         plan
//       });
//       this.fetchPlaces(plan);
//     } catch (error) {
//       throw new Error(
//         `An error occurred when setting the initial State: ${error.message}`
//       );
//     }
//   }

//   async fetchPlan(userId, planId) {
//     try {
//       return await getPlan(userId, planId);
//     } catch (error) {
//       console.log(
//         `An error occurred when attempting to retrieve the plan: ${error.message}`
//       );
//     }
//   }

//   fetchPlaces(plan) {
//     // const { google } = mapProps;
//     const placesService = new window.google.maps.places.PlacesService(
//       document.createElement("div")
//     );
//     plan.places.forEach(place => {
//       const placeRequest = {
//         fields: constants.PLACES_API_FIELDS,
//         placeId: place.placeId
//       };
//       placesService.getDetails(
//         placeRequest,
//         this.setInitialState(place.sortKey)
//       );
//     });
//   }

//   setInitialState(sortKey) {
//     const handlePlaceResults = (placeResults, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//         const place = {
//           placeId: placeResults.place_id,
//           name: placeResults.name,
//           businessStatus: placeResults.business_status,
//           formattedAddress: placeResults.formatted_address,
//           location: placeResults.geometry.location,
//           openingHours: placeResults.opening_hours,
//           photos: placeResults.photos || [],
//           priceLevel: placeResults.price_level || constants.DEFAULT_PRICE_LEVEL,
//           rating: placeResults.rating || constants.DEFAULT_RATING,
//           website: placeResults.website || "",
//           sortKey: sortKey
//         };

//         this.setState({
//           places: [...this.state.places, place]
//         });
//       } else {
//         console.log(
//           `There was an error fetching place details data: ${status}`
//         );
//       }
//     };
//     return handlePlaceResults;
//   }

//   addPlace(placeResults, input) {
//     // Clear input
//     input.value = "";
//     const newPlace = {
//       placeId: placeResults.place_id,
//       name: placeResults.name,
//       businessStatus: placeResults.business_status,
//       formattedAddress: placeResults.formatted_address,
//       location: placeResults.geometry.location,
//       openingHours: placeResults.opening_hours,
//       photos: placeResults.photos || [],
//       priceLevel: placeResults.price_level || constants.DEFAULT_PRICE_LEVEL,
//       rating: placeResults.rating || constants.DEFAULT_RATING,
//       website: placeResults.website || "",
//       sortKey: this.state.places.length
//     };
//     const existingPlace = this.state.places.find(place => {
//       return place.placeId === newPlace.placeId;
//     });
//     if (!existingPlace) {
//       this.setState({
//         places: [...this.state.places, newPlace]
//       });
//     }
//   }

//   deletePlace(placeId) {
//     const newPlaces = [];
//     let found = false;
//     const places = this.state.places.slice();
//     for (let index = 0; index < places.length; index++) {
//       if (places[index].placeId === placeId) {
//         found = true;
//         continue;
//       }
//       if (found) {
//         places[index].sortKey -= 1;
//       }
//       newPlaces.push(places[index]);
//     }
//     this.setState({
//       places: newPlaces
//     });
//   }

//   // Add or update a plan
//   addPlanDetails(plan) {
//     const trimmedPlan = trimObjectFieldValues(plan);
//     this.setState({
//       plan: {
//         planId: uuidv4(),
//         ...trimmedPlan
//       }
//     });
//   }

//   updatePlanDetails(plan) {
//     const trimmedPlan = trimObjectFieldValues(plan);
//     this.setState({
//       plan: {
//         planId: this.state.plan.planId,
//         ...trimmedPlan
//       }
//     });
//   }

//   // Google doesn't allow storage of Places API data for more than 30 days,
//   // with the sole exception being the the placeId attribute.
//   // Based on their terms and conditions, the placeId can be stored indefinitely
//   // https://developers.google.com/places/web-service/policies

//   async storePlan() {
//     if (this.state.places.length === 0) {
//       console.log("Please choose at least one place.");
//     } else {
//       const plan = { ...this.state.plan };
//       plan.places = this.addSortKey(this.state.places);
//       try {
//         await addPlan(this.context.currentUser.userId, plan);
//       } catch (error) {
//         console.log(`Error in saving plan information: ${error.message}`);
//       }
//       this.props.history.push(`/users/${this.context.currentUser.displayName}`);
//     }
//   }

//   async updatePlan() {
//     if (this.state.places.length === 0) {
//       console.log("Please choose at least one place.");
//     } else {
//       const plan = { ...this.state.plan };
//       plan.places = this.addSortKey(this.state.places);
//       try {
//         await updatePlan(this.context.currentUser.userId, plan);
//       } catch (error) {
//         console.log(`Error in updating plan information: ${error.message}`);
//       }
//       this.props.history.push(`/users/${this.context.currentUser.displayName}`);
//     }
//   }

//   // Needed so that I can get places out of firebase in the same order
//   // They were in when I inserted them
//   addSortKey(places) {
//     return places.map((place, index) => {
//       return { placeId: place.placeId, sortKey: index };
//     });
//   }

//   toggleView() {
//     this.setState({ isDiscoverView: !this.state.isDiscoverView });
//   }

//   togglePlaceModal(place) {
//     this.setState({
//       isPlaceModalVisible: !this.state.isPlaceModalVisible,
//       selectedPlace: this.state.selectedPlace ? null : place
//     });
//   }

//   changeSortOrder(sortOrder) {
//     this.setState({ sortOrder });
//   }

//   sortPlaces(places) {
//     return sortRunner(places, this.state.sortOrder);
//   }

//   dragEndHandler(result) {
//     const { destination, source } = result;

//     // dropped outside of list
//     if (!destination) {
//       return;
//     }

//     // reorder places array
//     const reorderedPlaces = reorderPlaces(
//       this.state.places,
//       source.index,
//       destination.index
//     );

//     // set state
//     this.setState({
//       places: reorderedPlaces,
//       sortOrder: constants.SORT_BY_USER_INPUT
//     });
//   }

//   handleMarkerMouseover(placeId) {
//     this.setState({
//       mousedOverPlaceId: placeId
//     });
//   }

//   handleMarkerMouseout() {
//     this.setState({
//       mousedOverPlaceId: ""
//     });
//   }

//   render() {
//     if (!this.context.isLoggedIn) {
//       return <Redirect to="/" />;
//     }

//     if (this.state.isPlaceModalVisible) {
//       disableScrollY();
//       disableNavigation();
//     } else {
//       enableScrollY();
//       enableNavigation();
//     }

//     const sortedPlaces = this.sortPlaces(this.state.places);

//     return (
//       <DocumentTitle
//         title={`${this.state.discoverMode[0].toUpperCase() +
//           this.state.discoverMode.slice(1)} Plan | Nightlife`}
//       >
//         <>
//           <div className="discover-container">
//             <div className="google-map">
//               <Map
//                 toggleModal={place => this.togglePlaceModal(place)}
//                 places={sortedPlaces}
//                 shouldRenderMarkers={
//                   this.state.isDiscoverView ||
//                   this.state.discoverMode === constants.DISCOVER_MODE.VIEW
//                 }
//                 handleMouseover={this.handleMarkerMouseover}
//                 handleMouseout={this.handleMarkerMouseout}
//               />
//             </div>
//             <div className="user-actions">
//               <CreatePlan
//                 addPlace={this.addPlace}
//                 deletePlace={placeId => this.deletePlace(placeId)}
//                 setPlanDetails={plan =>
//                   this.state.discoverMode === constants.DISCOVER_MODE.CREATE
//                     ? this.addPlanDetails(plan)
//                     : this.updatePlanDetails(plan)
//                 }
//                 updatePlan={this.updatePlan}
//                 storePlan={this.storePlan}
//                 toggleView={this.toggleView}
//                 toggleModal={this.togglePlaceModal}
//                 places={sortedPlaces}
//                 isDiscoverView={this.state.isDiscoverView}
//                 plan={this.state.plan}
//                 discoverMode={this.state.discoverMode}
//                 changeSortOrder={this.changeSortOrder}
//                 dragEndHandler={this.dragEndHandler}
//                 mousedOverPlaceId={this.state.mousedOverPlaceId}
//               />
//             </div>
//           </div>
//           {this.state.isPlaceModalVisible && (
//             <PlaceDetailsModal
//               place={this.state.selectedPlace}
//               toggleModal={place => this.togglePlaceModal(place)}
//             />
//           )}
//         </>
//       </DocumentTitle>
//     );
//   }
// }

