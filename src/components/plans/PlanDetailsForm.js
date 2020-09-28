import React, { useEffect } from "react";
import PropTypes from "prop-types";
import InputGroup from "../forms/InputGroup";
import TextAreaGroup from "../forms/TextAreaGroup";
import DatePicker from "../forms/DatePicker";
import TimePicker from "../forms/TimePicker";
import useFormState from "../../hooks/useFormState";
import usePrevious from "../../hooks/usePrevious";
import {
  required,
  validateLength,
  validateDateRange,
  validateDateTime
} from "../../utils/formValidators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PlanDetailsForm = props => {
  // Declare Variables

  const initialValues = {
    title: props.plan.title,
    description: props.plan.description,
    date: props.plan.date,
    time: props.plan.time
  };

  const fieldValidators = {
    title: [required, validateLength(1, 100)],
    description: [required, validateLength(1, 140)],
    date: [required, validateDateRange(new Date().toLocaleDateString(), "")],
    time: [required, validateDateTime]
  };

  const onSubmit = fieldValues => {
    props.handleFormSubmission(fieldValues);
    props.toggleView();
  };

  // Declare Hooks

  const [
    fields,
    errors,
    setValues,
    handleChange,
    handleBlur,
    handleFocus,
    handleSubmit
  ] = useFormState({
    initialValues,
    onSubmit,
    fieldValidators
  });

  const prevPlan = usePrevious(props.plan);

  // componentDidUpdate
  useEffect(() => {
    if (prevPlan !== props.plan) {
      // loop from plan fields and call handleChange each time
      const newValues = {};
      for (const property in props.plan) {
        if (fields.hasOwnProperty(property)) {
          newValues[[property]] = props.plan[[property]];
        }
      }
      setValues(newValues);
    }
  });

  return (
    <div className="card">
      <h3 className="card-title mb-2">Plan Details</h3>
      <p className="mb-3 text-medium">
        Enter some details about your night out
      </p>
      <form onSubmit={handleSubmit}>
        <DatePicker
          inputName="date"
          labelName="Date"
          placeholder="mm/dd/yyyy"
          autoFocus={true}
          value={fields["date"]}
          error={errors["date"]}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
        <TimePicker
          inputName="time"
          labelName="Time"
          autoFocus={false}
          value={fields["time"]}
          error={errors["time"]}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
        <InputGroup
          type="text"
          inputName="title"
          labelName="Title"
          autoFocus={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          value={fields["title"]}
          error={errors["title"]}
        />
        <TextAreaGroup
          name="description"
          labelName="Description"
          autoFocus={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          value={fields["description"]}
          error={errors["description"]}
          rows={60}
          cols={8}
        />
        <button
          type="submit"
          className="btn btn-primary forward-btn float-right"
        >
          Next
          <FontAwesomeIcon icon={["fa", "chevron-right"]} />
        </button>
      </form>
    </div>
  );
};

PlanDetailsForm.propTypes = {
  toggleView: PropTypes.func.isRequired,
  handleFormSubmission: PropTypes.func.isRequired,
  plan: PropTypes.shape({
    planId: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    placeIds: PropTypes.arrayOf(PropTypes.string)
  })
};

export default PlanDetailsForm;
