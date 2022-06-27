import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createProduct, savePhoto } from "redux/product";

const CreateProduct = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { ref: titleRef, ...titleRest } = register("title", { required: true });
  const { ref: descRef, ...descRest } = register("desc", { required: true });
  const { ref: typeRef, ...typeRest } = register("type", { required: true });
  const { ref: priceRef, ...priceRest } = register("price", { required: true, valueAsNumber: true,});
  const { ref: photoRef, ...photoRest } = register("photo", { required: true });
  const { ref: statusRef, ...statusRest } = register("status", { required: true });
  const { ref: roomIdRef, ...roomIdRest } = register("room", { });
  const { ref: durationRef, ...durationRest } = register("duration", { });

  const onSubmit = (data) => {
    if (Object.keys(errors).length) {
      alert("Error saving product: " + JSON.stringify(errors));
    } else {
      dispatch(savePhoto({ file: data.photo[0] })).then((action) => {
        const photoUrl = action.payload;
        if (photoUrl) {
          dispatch(
            createProduct({
              title: data.title,
              desc: data.desc,
              type: data.type,
              price: data.price,
              photo: photoUrl,
              status: data.status,
            })
          ).then(() => {
            reset();
            console.log("added to DB");
          });
        }
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-3 my-3 border border-primary">
      <FormGroup>
        <Label for="title">Product Title</Label>
        <Input id="title" type="text" {...titleRest} innerRef={titleRef} invalid={errors.title} />
      </FormGroup>
      <FormGroup>
        <Label for="desc">Product Description</Label>
        <Input id="desc" type="text" {...descRest} innerRef={descRef} invalid={errors.desc} />
      </FormGroup>
      <FormGroup>
        <Label for="type">Product Type</Label>
        <Input id="type" type="select" {...typeRest} innerRef={typeRef} invalid={errors.type}>
          <option value="" hidden></option>
          <option value="addon">Add-On</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="price">Product Price</Label>
        <Input id="price" type="number" {...priceRest} innerRef={priceRef} invalid={errors.price} />
      </FormGroup>
      <FormGroup>
        <Label for="photo">Product Photo</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          {...photoRest}
          innerRef={photoRef}
          invalid={errors.photo}
        />
      </FormGroup>
      <FormGroup>
        <Label for="status">Product Status</Label>
        <Input
          id="status"
          type="select"
          {...statusRest}
          innerRef={statusRef}
          invalid={errors.status}
        >
          <option value="" hidden></option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Input>
      </FormGroup>
      <Button type="submit" color="primary">
        Save Product
      </Button>
    </Form>
  );
};

export default CreateProduct;
