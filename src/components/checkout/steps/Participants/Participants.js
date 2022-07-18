import React from "react";
import { useWizard } from "react-use-wizard";
import { useDispatch } from 'react-redux';
import { setParticipants } from 'redux/cartDetails';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function Participants() {
  const dispatch = useDispatch();
  const { nextStep, previousStep } = useWizard();
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const onSubmit = (data) => {
    const { participants } = data;
    dispatch(setParticipants(participants));
    nextStep();
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
      >
        <ul className="list-unstyled">
          {fields.map((item, index) => (
            <li key={item.id}>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Controller
                  render={({ field }) => <Input id="firstName" {...field} />}
                  name={`participants.${index}.firstName`}
                  control={control}
                />
                <Label for="lastName">Last Name</Label>
                <Controller
                  render={({ field }) => <Input id="lastName" {...field} className="mb-3" />}
                  name={`participants.${index}.lastName`}
                  control={control}
                />
                <Button type="button" onClick={() => remove(index)}>
                  Remove Jumper
                </Button>
              </FormGroup>
            </li>
          ))}
        </ul>
        <hr />
        <Button
          type="button"
          color="primary"
          className="mb-3"
          onClick={() => append({ firstName: "", lastName: "" })}
        >
          Add Jumper
        </Button>
        {/* <Button type="submit">Submit</Button> */}
        <div className="d-flex">
          <Button
            color="secondary"
            onClick={() => previousStep()}
            className={"flex-grow-1 w-50 mr-2"}
            outline
          >
            Back
          </Button>
          <Button
            type="submit"
            color="warning"
            // onClick={() => nextStep()}
            className="flex-grow-1 w-75"
          >
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Participants;
