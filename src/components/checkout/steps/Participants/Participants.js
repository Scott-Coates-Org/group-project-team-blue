import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

function Participants() {
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
    console.log(data);
  };

  return (
    <div>
      <Form
        className="p-3 my-3 border border-primary"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ul style={{ "list-style-type": "none" }}>
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
                  render={({ field }) => <Input id="lastName" {...field} />}
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
        <Button
          type="button"
          onClick={() => append({ firstName: "", lastName: "" })}
        >
          Add Jumper
        </Button>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Participants;
