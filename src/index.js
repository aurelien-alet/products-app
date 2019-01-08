import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

class ProductsFilter extends React.Component {
    render() {
        return(
            <div>
                <div>
                    <input 
                        placeholder='Search...' 
                        value={this.props.searchText}
                        onChange={this.props.handleInputChange}
                    />
                </div>
                <div>
                    <input 
                        type='checkbox' id='inStockCheckbox' 
                        checked={this.props.hideEmptyStock}
                        onChange={this.props.handleChecboxChange}
                    />
                    <label> Only show products in stock</label>
                </div>
            </div>
        );
    }
}


class ProductsTable extends React.Component {
    render() {
        const products = this.props.products;
        const categoriesNames = [...new Set(products.map(item => item.category))]; 
        const categories = categoriesNames.map( categoryName => 
                <ProductsCategory value={categoryName} products={products} key={categoryName}/>
        );
        return(
            <div>
                <b className='productsTableCell'>Name</b>
                <b className='productsTableCell'>Price</b>
                {categories}
            </div>
        );
    }
}

class ProductsCategory extends React.Component {
    render() {
        const categoryName = this.props.value;
        const products = this.props.products.map( product => {
            if( product.category === categoryName ){
                return (
                    <Product name={product.name} price={product.price} key={product.name}/>
                );
            }
        });
        return(
            <div>
                <b>{categoryName}</b>
                {products}
            </div>
        );
    }
}

function Product(props) {
    return(
        <div>
            <p className='productsTableCell'>{props.name}</p>
            <p className='productsTableCell'>{props.price}</p>
        </div>
    );
}

class FilterableProductsTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            hideEmptyStock: false,
        };
        this.handleChecboxChange = this.handleChecboxChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({searchText: event.target.value});
    }

    handleChecboxChange(event) {
        this.setState({hideEmptyStock: event.target.checked });
    }

    render() {
        let products = this.props.products;
        if( this.state.hideEmptyStock ){
            products = products.filter( product => product.stocked );
        }
        const searchText = this.state.searchText.toUpperCase();
        if( searchText ){
            products = products.filter( product => ~product.name.toUpperCase().indexOf(searchText));
        }
        return(
            <div>
                <ProductsFilter 
                    hideEmptyStock={this.state.hideEmptyStock}
                    searchText={this.state.searchText}
                    handleChecboxChange={this.handleChecboxChange} 
                    handleInputChange={this.handleInputChange}
                />
                <ProductsTable products={products}/>
            </div>
        );
    }
}

ReactDOM.render(
    < FilterableProductsTable products={PRODUCTS} />,
    document.getElementById('root')
);