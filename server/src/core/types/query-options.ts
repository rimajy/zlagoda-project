import {PoolClient} from 'pg';

export interface QueryResponse {
	forUpdate?: boolean;
	client?: PoolClient;
}