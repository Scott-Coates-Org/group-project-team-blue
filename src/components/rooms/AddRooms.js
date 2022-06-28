import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createRoom, fetchAllRooms, savePhoto } from "redux/rooms";
import { Table } from "reactstrap";

const AddRooms = (props) => {
  const dispatch = useDispatch();

  const { data, isLoaded, hasErrors } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchAllRooms());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { ref: nameRef, ...nameRest } = register("name", { required: true });
  const { ref: capacityRef, ...capacityRest } = register("capacity", {
    required: true,
    valueAsNumber: true,
  });
  const { ref: photoRef, ...photoRest } = register("photo", { required: true });

  const onSubmit = (data) => {
    if (Object.keys(errors).length) {
      alert("Error saving product: " + JSON.stringify(errors));
    } else {
      dispatch(savePhoto({ file: data.photo[0] })).then((action) => {
        const photoUrl = action.payload;
        if (photoUrl) {
          dispatch(
            createRoom({
              name: data.name,
              capacity: data.capacity,
              photo: photoUrl,
            })
          ).then(() => {
            reset();
            //ued to update table on submit
            dispatch(fetchAllRooms());
            console.log("added to DB");
          });
        }
      });
    }
  };

  return (
    <section>
      {!isLoaded && "Rooms loading..."}
      {hasErrors && "Error Loading"}
      {isLoaded && (
        <div>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 my-3 border border-primary"
          >
            <FormGroup>
              <Label for="name">Room Name</Label>
              <Input
                id="name"
                type="text"
                {...nameRest}
                innerRef={nameRef}
                invalid={errors.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="capacity">Room Capacity</Label>
              <Input
                id="capacity"
                type="text"
                {...capacityRest}
                innerRef={capacityRef}
                invalid={errors.capacity}
              />
            </FormGroup>
            <FormGroup>
              <Label for="photo">Room Photo</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                {...photoRest}
                innerRef={photoRef}
                invalid={errors.photo}
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Save Room
            </Button>
          </Form>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Room Name</th>
                <th>Room Capacity</th>
                <th>Photo</th>
              </tr>
            </thead>
            {data.map((item, index) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.capacity}</td>
                    <td>
                      <img
                        src={item.photo}
                        alt="Room Image"
                        style={{ height: "200px" }}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
      )}
    </section>
  );
};

export default AddRooms;
