import React, { Component, Fragment } from 'react';
import { path } from 'ramda';
import { connect } from 'react-redux';
import { Profile } from '../../components/profile/profile';

import { IHeaderProps } from './header.state';

import { mapDispatchToProps, mapStateToProps } from './header.state';

import * as styles from "./header.css"

export class HeaderView extends Component<IHeaderProps, {}> {

    render() {
        const { metadata } = this.props
        return(
            <Fragment>
                <Profile metadata={metadata} />
            </Fragment>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderView);