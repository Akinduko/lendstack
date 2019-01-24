import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Progress } from 'reactstrap';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  invert: PropTypes.bool,
};

const defaultProps = {
  header: '0',
  icon: 'icon-people',
  color: '',
  value: '',
  children: '',
  invert: false,
};

class Widget04 extends Component {
  render() {
    const { className, cssModule, header, icon, color, value, children, invert, ...attributes } = this.props;

    // demo purposes only
    const progress = { style: '', color: color, value: value };
    const card = { style: '', bgColor: 'bg-info', icon: icon };

    if (invert) {
      progress.style = 'progress-white';
      progress.color = '';
      card.style = 'text-white';
      card.bgColor = 'bg-' + color;
    }

    const classes = mapToCssModules(classNames(className, card.style, card.bgColor), cssModule);
    progress.style = classNames('progress-xs mt-3 mb-0', progress.style);

    return (
      <Card className={classes} {...attributes}>
        <CardBody>
          <div className="h1 text-muted text-right mb-2">
            <i className={card.icon}></i>
          </div>
          <div className="h4 mb-0">{header}</div>
          <small className="text-muted text-uppercase font-weight-bold">{children}</small>
          {progress.value ?<Progress className={progress.style} color={progress.color} value={progress.value} />:null}
        </CardBody>
      </Card>
    );
  }
}

Widget04.propTypes = propTypes;
Widget04.defaultProps = defaultProps;

export default Widget04;