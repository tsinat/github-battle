var React = require('react');

var Main = React.createClass({
    render: function() {
        reutrn (
            <div>
                Hello from Main!
                {this.props.children}
            </div>
        )
    }
});

module.exports = Main;
