import React from 'react';
import { useLocation } from 'react-router-dom';
import MyNavbar from "../components/MyNavbar";
import {Card, Col, Container, Row} from "reactstrap";

interface ErrorActions {
  setErrorResponse: (response: ErrorResponse) => any;
}

export interface ErrorResponse {
  statusCode: number,
  message: string
}

// A context will be the way that we allow components lower down
// the tree to trigger the display of an error page
const ErrorContext = React.createContext<ErrorActions>({} as ErrorActions);

// The top level component that will wrap our app's core features
export const ErrorHandler = ({ children }: any) => {
  const location = useLocation();
  const [errorResponse, setErrorResponse ] = React.useState<ErrorResponse>();

  // Make sure to "remove" this status code whenever the user
  // navigates to a new URL. If we didn't do that, then the user
  // would be "trapped" into error pages forever
  React.useEffect(() => {
    // Listen for changes to the current location.
    console.log("changing location");
    return setErrorResponse(undefined);
  }, [location])

  // This is what the component will render. If it has an
  // errorStatusCode that matches an API error, it will only render
  // an error page. If there is no error status, then it will render
  // the children as normal
  const renderContent = () => {
    if (errorResponse?.statusCode || 0 >= 400) {
      return (
          <>
            <MyNavbar/>
            <Container className="bg-gradient-orange h-90vh" fluid>
              <Row className="justify-content-center align-items-center h-100">
                <Col className="col-md-5 col-sm-12">
                  <Card className="bg-translucent-dark">
                    <Row>
                      <h1 className="text-center text-red mt-5" style={{fontSize: 100}}>{errorResponse?.statusCode}</h1>
                    </Row>
                    <Row>
                      <h2 className="mb-5 text-center text-white">{errorResponse?.message || '¡Ups!'}</h2>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
      )
    }
    // ... more HTTP codes handled here

    return children;
  }

  // We wrap it in a useMemo for performance reasons. More here:
  // https://kentcdodds.com/blog/how-to-optimize-your-context-value/
  const contextPayload = React.useMemo(
      () => ({ setErrorResponse }),
      [setErrorResponse]
  );

  // We expose the context's value down to our components, while
  // also making sure to render the proper content to the screen
  return (
      // @ts-ignore
      <ErrorContext.Provider value={contextPayload}>
        {renderContent()}
      </ErrorContext.Provider>
  )
}

// A custom hook to quickly read the context's value. It's
// only here to allow quick imports
export const useErrorHandler = () => React.useContext(ErrorContext);