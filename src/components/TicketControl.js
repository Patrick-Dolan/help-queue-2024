import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './../actions';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
      1000
    );
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount() {
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    console.log("tick");
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = actions.toggleForm();
      dispatch(action);
    }
  }

  handleEditingClick = () => {
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const action = actions.addTicket(ticketToEdit);
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const action = actions.addTicket(newTicket);
    dispatch(action);
    const action2 = actions.toggleForm();
    dispatch(action2);
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({ selectedTicket: selectedTicket });
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = actions.deleteTicket(id);
    dispatch(action);
    this.setState({ selectedTicket: null });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.editing) {
      currentlyVisibleState = 
        <EditTicketForm 
          ticket={this.state.selectedTicket} 
          onEditTicket={this.handleEditingTicketInList}
        />;
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = 
        <TicketDetail 
          ticket={this.state.selectedTicket} 
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditingClick}
        />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = 
        <TicketList 
          ticketList={this.props.mainTicketList} 
          onTicketSelection={this.handleChangingSelectedTicket} 
        />;
      buttonText = "Add Ticket";
    }

    return (
      <>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </>
    );
  }
}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = (state) => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;