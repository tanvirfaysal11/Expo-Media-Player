import {
    ApolloClient,
    InMemoryCache, createHttpLink, DefaultOptions
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'
// import Storage from '@react-native-async-storage/async-storage';
import { BASE_URL as URL } from "../../constants/types";
import { debugPrint } from "../../screens/utils/systemUtils"
const cache = new InMemoryCache({
    typePolicies: {
        Container: {
            merge: true,
        },
    }
});

const httpLink = createHttpLink({
    uri: URL.GRAPHQL,
});
 
const logoutLink = onError(({ networkError, graphQLErrors, operation }) => {
    debugPrint("GaphQL Network Errors: ")
    networkError && debugPrint(networkError)
    graphQLErrors && debugPrint(graphQLErrors)
    // operation && debugPrint(operation)
})

const authLink = setContext(async (req, { headers }) => {
    let token = ""
    try {
        const auth = await Auth.get()
        token = auth ? `Bearer ${auth.token}` : ""
    } catch (error) {
        debugPrint(error)
    }
    return {
        headers: {
            ...headers,
            authorization: token,
            "Content-Type": "application/json",
            "User-Agent": "v1.0 (com.xeon.lataherbal; build:1 30) b1e6ba27-3372-49a8-8b19-fa3ce333737c",
            "RECAPTCHA-TOKEN": "A54B10F1-2AB6-4820-A215-64AD1961A477",
            "PACKAGE-ID": "com.xeon.lataherbal"
        }
    }
});

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}


export const client = new ApolloClient({
    cache: cache,
    link: logoutLink.concat(authLink.concat(httpLink)),
    defaultOptions
})
// Initialize Apollo client