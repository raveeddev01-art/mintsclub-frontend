import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ENV } from './config/config';

export const PrivateRoute = ({
	component: Component,
	access,
	path,
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			access || ENV.getUserKeys('_id')?._id ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: `/connect-wallet`,
						state: path,
					}}
				/>
			)
		}
	/>
);
