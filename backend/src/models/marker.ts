import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MarkerSchema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },

});

const Marker = mongoose.model('marker', MarkerSchema,'marker');

export default Marker;
