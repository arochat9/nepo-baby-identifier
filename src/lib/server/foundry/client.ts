"use server";

import { type Client, createClient } from "@osdk/client";
import { createConfidentialOauthClient } from "@osdk/oauth";

const client_id: string = "35a4aa58d7ead18341627f7a6070cd54";
const url: string = "https://magic.usw-3.palantirfoundry.com";
const ontologyRid: string = "ri.ontology.main.ontology.79dee872-8094-4fe0-8a82-93d1488a2294";
const client_secret = process.env.FOUNDRY_CLIENT_SECRET;
const scopes: string[] = [
	"api:ontologies-read",
    // "api:usage:ontologies-read",
	"api:ontologies-write",
	"api:mediasets-read",
	"api:mediasets-write"
];

const auth = createConfidentialOauthClient(client_id, client_secret!, url, scopes);
export const client: Client = createClient(url, ontologyRid, auth); 