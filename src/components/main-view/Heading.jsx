import Container from "react-bootstrap/Container";
import "./Heading.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Heading() {
  return (
    <Container fluid className="heading-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            fontFamily: "'Impact', sans-serif",
            fontWeight: "900",
            letterSpacing: "1px",
          }}
        >
          {" "}
          Stream movies{" "}
        </h1>
        <h1
          style={{
            fontSize: "4rem",
            fontFamily: "'Impact', sans-serif",
            fontWeight: "900",
            letterSpacing: "1px",
          }}
        >
          {" "}
          and create your unique watcher profile!{" "}
        </h1>
      </div>
    </Container>
  );
}
