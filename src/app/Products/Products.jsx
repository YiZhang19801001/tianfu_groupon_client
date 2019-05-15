import React from "react";
import { connect } from "react-redux";
import { Link, Element, Events } from "react-scroll";
import Carousel from "../shared/Carousel";

import { getProducts, showModal } from "../../_actions";
import ProductCard from "./ProductCard";
import { Head, ShoppingCart, ScrollNotification } from "../shared/";

let lastScrollTop = 0;
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myContainer = React.createRef();
    this.state = {
      CarouselHeight: 130,
      backgroundColor: "#00000066",
      color: "#fff"
    };
  }

  resetCarouselHeight = currentScrollTop => {
    const calculateHeight = 130 - currentScrollTop;
    const containerHeight = this.myContainer.current.clientHeight;

    this.setState({
      CarouselHeight: calculateHeight > 0 ? calculateHeight : 0
    });
    if (containerHeight > calculateHeight && containerHeight < 130) {
      this.setState({
        backgroundColor: "#fff",
        color: "#3b3b3b"
      });
    } else {
      this.setState({
        backgroundColor: "#00000066",
        color: "#fff"
      });
    }
  };

  handleScroll = e => {
    const currentScrollTop = e.target.scrollTop;
    if (currentScrollTop > lastScrollTop) {
      this.resetCarouselHeight(currentScrollTop);
    } else {
      this.resetCarouselHeight(currentScrollTop);
    }
    lastScrollTop = currentScrollTop;
  };
  componentDidMount() {
    this.props.getProducts();
  }

  componentDidUpdate() {
    if (this.myRef.current) {
      this.myRef.current.addEventListener("scroll", this.handleScroll);
    }
  }
  componentWillUnmount() {
    this.myRef.current.removeEventListener("scroll", this.handleScroll);
  }
  render() {
    if (!this.props.labels.app_head_title) {
      return <div>loading...</div>;
    }
    return (
      <React.Fragment>
        <Head title={this.props.labels.app_head_title} pageName="products" />
        <div
          ref={this.myContainer}
          style={{
            position: "relative",
            minHeight: "3.2rem",
            backgroundColor: "#fff"
          }}
        >
          <div
            style={{
              height: `${this.state.CarouselHeight}px`,
              overflow: "hidden",
              transition: "all 300ms ease-in"
            }}
          >
            <Carousel />
          </div>
          <ScrollNotification
            backgroundColor={this.state.backgroundColor}
            color={this.state.color}
          />
        </div>
        {/* <Notice /> */}
        <div className="component-products">
          <div className="component-products__category-list">
            {this.props.products.map(category => {
              return (
                <Link
                  key={`categoryList${category.category_id}`}
                  activeClass="active"
                  to={`nav${category.category_id}`}
                  className="component-products__item"
                  isDynamic={true}
                  offset={-110}
                  spy={true}
                  smooth={true}
                  duration={300}
                  onSetActive={this.handleSetActive}
                  containerId="product-list"
                >
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>

          <div
            id="product-list"
            ref={this.myRef}
            className="component-products__product-list"
          >
            {this.props.products.map(productGroup => {
              return (
                <Element
                  className="component-products__item"
                  key={`productGroup${productGroup.category_id}`}
                  name={`nav${productGroup.category_id}`}
                >
                  <h3 className="">{productGroup.name}</h3>
                  {productGroup.products.map(product => {
                    return (
                      <ProductCard
                        key={`product${product.product_id}`}
                        product={product}
                      />
                    );
                  })}
                </Element>
              );
            })}
          </div>
        </div>
        <ShoppingCart />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ products, language_id, labels }) => {
  return { products, language_id, labels };
};

export default connect(
  mapStateToProps,
  { getProducts, showModal }
)(Products);
