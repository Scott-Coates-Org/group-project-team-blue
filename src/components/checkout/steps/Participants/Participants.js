import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, Form, FormGroup, Input, Label, Col } from "reactstrap";

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
              <FormGroup row>
                <Label for="fullName" sm={3}>
                  Full Name
                </Label>
                <Col sm={9}>
                  <Controller
                    render={({ field }) => <Input id="fullName" {...field} />}
                    name={`participants.${index}.fullName`}
                    control={control}
                  />
                </Col>
                <Button type="button" onClick={() => remove(index)}>
                  Remove Jumper
                </Button>
              </FormGroup>
            </li>
          ))}
        </ul>
        <Button type="button" onClick={() => append({ fullName: "" })}>
          Add Jumper
        </Button>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Participants;
