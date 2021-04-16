import React from 'react';

import { connect, ConnectedComponent } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, Actions } from '../../store';

/**
 * @description Creates a store connected higher order component
 * @param actionMap an object representing the action that must be called from prop callbacks i.e {propCallback: () => actionCreator()}
 * @param mapStateToProps state binding callback
 * @param component functional component that will be connected to the store.
 */
export function createStoreConnectedComponent<T>(
    actionMap: {},
    mapStateToProps: (state: RootState) => Partial<T>,
    component: React.FC<any>
): ConnectedComponent<React.FC, any> {
    const mapDispatchToProps = (dispatch: Dispatch<Actions>): any =>
        bindActionCreators(actionMap, dispatch);
    return connect(mapStateToProps, mapDispatchToProps)(component);
}
