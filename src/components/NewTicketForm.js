import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import ReusableForm from './ReusableForm';
import { formatDistanceToNow } from 'date-fns';

function NewTicketForm(props){
  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({
      names: event.target.names.value, 
      location: event.target.location.value, 
      issue: event.target.issue.value, 
      id: v4(),
      timeOpen: new Date(),
      formattedWaitTIme: formatDistanceToNow(new Date(), { addSuffix: true })
    });
  }

  return (
    <>
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" 
      />
    </>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;