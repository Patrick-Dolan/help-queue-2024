import PropTypes from "prop-types";

function Ticket(props) {
  return (
    <>
      <div onClick={() => props.whenTicketClicked(props.id)}>
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <hr/>
      </div>
    </>
  );
}

Ticket.propTypes = {
  names: PropTypes.string,
  location: PropTypes.string,
  issue: PropTypes.string,
  id: PropTypes.string,
  whenTicketClicked: PropTypes.func
};

export default Ticket;