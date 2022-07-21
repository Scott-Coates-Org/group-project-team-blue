import hopper from "../../assets/hopper.webp";
import { Container, Row, Col, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchBookingById } from "redux/booking";
const jwt = require("jsonwebtoken");

const Thankyou = () => {
  const dispatch = useDispatch();
  const {
    data: bookingData,
    isLoaded: bookingIsLoaded,
    hasErrors: bookingHasErrors,
  } = useSelector((state) => state.booking);

  const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const query = useQuery();
  const bookingToken = query.get("booking");
  const key = process.env.REACT_APP_JWT_SECRET;
  let bookingId;

  const result = jwt.verify(bookingToken, key, { algorithm: "HS256" }, (err, decoded) => {
    if (err) {
      return { error: err.name, ...err };
    }

    return decoded;
  });

  if (result.error) {
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <div className="bg-white text-center">
          <h4 className="text-danger">{result.error}</h4>
          <h4 className="text-danger">{JSON.stringify(result.expiredAt)}</h4>
        </div>
      </div>
    );
  }

  useEffect(() => {
    dispatch(fetchBookingById({ id: bookingId }));
  }, []);

  const styles = {
    h3: {
      zIndex: 10,
      position: "relative",
    },
    img: {
      position: "relative",
      transform: "translateX(-50%)",
      left: "65%",
    },
    container: {
      maxWidth: "620px",
    },
    logo: {
      color: "#f9ff00",
      fontFamily: "'Concert One', sans-serif",
      fontSize: "2rem",
      textShadow: "-2px 2px 0px #ff5f92, 0 0 3px #2E1766, 0 0 10px #2E1766",
      position: "relative",
      top: "-10px",
    },
    h5: {
      textAlign: "right",
      fontSize: "18px",
    },
    total: {
      fontSize: "18px",
    },
  };

  return (
    <>
      {bookingHasErrors && "Error Loading"}
      {bookingIsLoaded && (
        <section className="d-flex flex-column justify-content-center align-items-center min-vh-100 h-100 checkout-bg p-3 overflow-auto pt-5">
          <div className="d-flex position-relative">
            <img
              src={hopper}
              width="300px"
              style={styles.img}
              alt="Jim Hopper from Stranger Things"
            />
            <div className="bubble bubble-bottom-left shadow-lg">
              <span style={styles.h3}>Thank you!</span>
            </div>
          </div>
          <Container
            className="px-2 pt-3 pb-5 bg-white rounded shadow-lg"
            style={styles.container}
          >
            <Row className="mx-1 pb-2 d-flex align-items-center border-bottom">
              <Col>
                <span style={styles.logo}>HOPPER</span>
              </Col>
              <Col className="d-flex justify-content-end">
                <h5 style={styles.h5}>
                  <b>ORDER CONFIRMATION</b>
                </h5>
              </Col>
            </Row>
            <Row className="mx-1 mt-4">
              <h5 className="text-primary">
                Hello {`${bookingData.customer?.first} ${bookingData.customer?.last}`}
              </h5>
            </Row>
            <Row className="mx-1">
              <p>
                Thank you for choosing to hop with us! Please remember to arrive 10 minutes
                prior to your booked time to allow time for check-in & to change into your
                awesome hopper socks.
              </p>
            </Row>
            <Row className="mx-1 mt-4 d-flex align-items-center border-bottom">
              <h5 className="text-primary">Order Details</h5>
            </Row>
            <Row className="mx-1 mt-2">
              Confirmation #
              <span className="text-primary">{bookingData.stripe?.transactionId}</span>
            </Row>
            <Row className="mx-1 mt-4">
              <Table borderless size="sm" responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData.order?.products.map((product) => (
                    <tr>
                      <td>
                        <b>{product.title}</b>
                        <br />
                        <i className="pl-1">{bookingData.order?.products.bookingDate}</i>
                      </td>
                      <td>{product.quantity}</td>
                      <td>${product.price * product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
            <Row className="mx-1 mt-4 w-50 d-flex ml-auto" style={styles.total}>
              <Col>
                <b>Grand Total:</b>
              </Col>
              <Col>
                <b>${bookingData.order?.amount}</b>
                <b>$2,189.92</b>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default Thankyou;
