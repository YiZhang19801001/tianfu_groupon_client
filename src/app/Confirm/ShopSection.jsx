import React from "react";
import { connect } from "react-redux";
import ShopCard from "./ShopCard";
import { fetchShops, selectShop } from "../../_actions";
class ShopSection extends React.Component {
  componentDidMount() {
    this.props.fetchShops();
  }

  renderShops = () => {
    return this.props.shops.map(shop => {
      return (
        <ShopCard
          key={`shopSectionShop${shop.location_id}`}
          toggleSection={this.props.toggleSection}
          shop={shop}
        />
      );
    });
  };
  handleOnChange = e => {
    const location_id = e.target.value;
    this.props.shops.map(shop => {
      if (parseInt(location_id) === shop.location_id) {
        this.props.selectShop(shop);
      }
    });
  };
  renderShopSelector = () => {
    const shops = this.props.shops;
    const shop = this.props.selectedShop;

    return (
      <select onChange={this.handleOnChange} value={shop.location_id}>
        {shops.map(element => {
          return (
            <option
              key={`shopOption${element.location_id}`}
              value={element.location_id}
            >
              {element.name}
            </option>
          );
        })}
      </select>
    );
  };
  renderShopCard = () => {
    const shop = this.props.selectedShop;
    if (!shop.open) {
      return null;
    }
    return <ShopCard shop={shop} toggleSection={this.props.toggleSection} />;
  };

  // render() {
  //   return <div className={`shop-section`}>{this.renderShops()}</div>;
  // }
  render() {
    return (
      <div className={`shop-section`}>
        {this.renderShopSelector()}
        {this.renderShopCard()}
      </div>
    );
  }
}

const mapStateToProps = ({ shops, selectedShop }) => {
  return { shops, selectedShop };
};

export default connect(
  mapStateToProps,
  { fetchShops, selectShop }
)(ShopSection);
