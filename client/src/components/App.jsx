import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import Modal from './Modal.jsx';
import Description from './HotelDescription.jsx';
import styled from 'styled-components';
import circleFill from '../icons.js';

console.log('hello app');

const AppWrapper = styled.div`
  background-color: ${props => props.theme.whiteSmoke};
  height: 1030px;
  width: 765px;
  margin: 12px;
  padding: 24px;
  position: relative;
`;

const H2 = styled.h2`
  font: 28;
  color: black;
  font-family: ${props => props.theme.font};
`;

const CarouselWrapper = styled.div`
  position: relative;
  cursor: pointer;
  height: 340px;
  width: 370px;
  background-color: #f5dcdc;
  // display: flex;
  // flex-flow: column;
  // justify-content: center;
  // align-items: center;
  // display: block;
  // margin: 0 auto;
  // overflow: hidden;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotel: [],
      preview: [],
      isLoaded: false,
      showModal: false,
      modalAlbum: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    console.log('state before mount', this.state);
    return (
      this.getData()
    );
  }

  // GET
  // testing with 1 hotel
  getData() {
    // return (
    axios.get('/api/photos')
      .then((response) => {
        // test which hotel we are looking at here
        const hotel = response.data[2];
        const preview = [
          hotel.roomAlbum,
          hotel.diningAlbum,
          hotel.poolAlbum,
          hotel.gymAlbum,
          hotel.bathroomAlbum,
          hotel.eventRoomAlbum,
          hotel.roomViewAlbum,
        ];
        console.log('all hotel records', response.data);
        console.log('1st hotel record', hotel);
        this.setState({
          hotel,
          preview,
          isLoaded: true,
        });
        (error) => {
          this.setState({ isLoaded: true });
          console.log(error);
        };
        console.log('hotel data', this.state);
        console.log('preview data', this.state.preview);
      })
    // );
  }

  toggleModal(modalAlbum) {
    console.log('toggle modal', modalAlbum);
    this.setState({
      showModal: !this.state.showModal,
      modalAlbum,
    });
  }

  render() {

    console.log('test', this.state.hotel);

    // refactor to switch statement later? ...
    const modalAlbum = this.state.modalAlbum === 'Room & Suite' ? 'roomAlbum' : this.state.modalAlbum === 'Dining' ? 'diningAlbum' : this.state.modalAlbum === 'Pool & Beach' ? 'poolAlbum' : this.state.modalAlbum === 'Gym' ? 'gymAlbum' : this.state.modalAlbum === 'Bathroom' ? 'bathroomAlbum' : this.state.modalAlbum === 'Business Center & Event Rooms' ? 'eventRoomAlbum' : 'roomViewAlbum';

    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <AppWrapper>
        {/* <TestTitle>Hello App!</TestTitle> */}
        <H2>About</H2>
        <hr />
        <p>This property matches all of your filters.</p>
        <p>Matches: &#10004; Hotels</p>
        <hr />

        <table>
          <tbody>
            <tr>
              <th rowSpan="2">4.5</th>
              <th>Excellent</th>
            </tr>
            <tr>
              <th>
                {/* {circleFill} */}
                <svg className="bi bi-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#00aa6c" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg className="bi bi-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#00aa6c" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg className="bi bi-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#00aa6c" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg className="bi bi-circle-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="#00aa6c" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8"/>
                </svg>
                <svg className="bi bi-circle-half" width="1em" height="1em" viewBox="0 0 16 16" fill="#00aa6c" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15V1a7 7 0 1 1 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
                </svg>
              </th>
              <th>2,929 reviews</th>
            </tr>
          </tbody>
        </table>

        <p>#10 of 174 hotels in Denver</p>

        <table>
          <tbody>
            <tr>
              <td>...dots...</td>
              <td>Location</td>
            </tr>
            <tr>
              <td>...dots...</td>
              <td>Cleanliness</td>
            </tr>
            <tr>
              <td>...dots...</td>
              <td>Service</td>
            </tr>
            <tr>
              <td>...dots...</td>
              <td>Value</td>
            </tr>
          </tbody>
        </table>

        <hr />
        <p>{Description}</p>

        <CarouselWrapper>
          <Carousel
            hotel={this.state.hotel}
            preview={this.state.preview}
            toggleModal={this.toggleModal}
          />
        </CarouselWrapper>

        <div className="modal">

          {
          this.state.showModal && (
            <Modal
              hotel={this.state.hotel}
              album={this.state.hotel[modalAlbum]}
              toggleModal={this.toggleModal}
              showModal={this.state.showModal}
            />
          )
          }
        </div>

      </AppWrapper>
    );
  }
}

export default App;
