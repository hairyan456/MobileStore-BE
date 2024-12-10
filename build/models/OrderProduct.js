"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var orderSchema = new _mongoose["default"].Schema({
  orderItems: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      require: false
    },
    product: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  }],
  shippingAddress: {
    fullName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: true
    }
  },
  paymentMethod: {
    type: String,
    required: true
  },
  itemsPrice: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number,
    required: true
  },
  taxPrice: {
    type: Number,
    required: false,
    "default": 0.08
  },
  totalPrice: {
    type: Number,
    required: true
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPaid: {
    type: Boolean,
    "default": false
  },
  paidAt: {
    type: Date,
    "default": ''
  },
  isDelivered: {
    type: Boolean,
    "default": false
  },
  deliveredAt: {
    type: Date
  }
}, {
  timestamps: true
});
var Order = _mongoose["default"].model("Order", orderSchema);
module.exports = Order;