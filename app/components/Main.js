var React = require('react');

var Main = React.createClass({
    render: function() {
        reutrn (
            <div className='main-container'>
                {this.props.children}
            </div>
        )
    }
});

module.exports = Main;
