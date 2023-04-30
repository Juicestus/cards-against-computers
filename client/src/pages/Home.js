import {Button} from 'react-bootstrap';

const Homepage = () => {
    return (
        <div className="homepage">
	        <h1>Cards Against Computers</h1>
            <Button href="/create">Create a Room</Button>
            <Button href="/join">Join a Room</Button>
        </div>
    );
};

export default Homepage;
