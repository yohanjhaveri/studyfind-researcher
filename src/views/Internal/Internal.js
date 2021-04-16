import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Page } from "components";

import { auth, firestore } from "database/firebase";
import { useDocument, useCollection } from "hooks";

import Sidebar from "./Sidebar";
import Verification from "./Verification/Verification";

import Welcome from "views/Internal/Welcome/Welcome";
import Dashboard from "views/Internal/Dashboard/Dashboard";
import FetchStudy from "views/Internal/Study/FetchStudy/FetchStudy";
import CreateStudy from "views/Internal/Study/CreateStudy/CreateStudy";
import ViewStudy from "views/Internal/Study/ViewStudy/ViewStudy";
import Notifications from "views/Internal/Notifications/Notifications";
import Schedule from "views/Internal/Schedule/Schedule";
import Account from "views/Internal/Account/Account";
import Feedback from "views/Internal/Feedback/Feedback";

import { UserContext, StudiesContext } from "context";

function Internal() {
  // TODO: Add failure state here if loading user or studies returns and error
  const cred = auth.currentUser;
  const { uid } = cred;
  const [user] = useDocument(firestore.collection("researchers").doc(uid));
  const [studies] = useCollection(
    firestore
      .collection("studies")
      .where("researcher.id", "==", uid)
      .orderBy("updatedAt", "desc")
  );

  return (
    <Flex>
      <UserContext.Provider value={user}>
        <StudiesContext.Provider value={studies}>
          <Sidebar cred={cred} user={user} />
          <Box
            ml="280px"
            w="100%"
            minH={cred.emailVerified ? "100vh" : "calc(100vh - 56px)"}
            mt={cred.emailVerified ? "" : "40px"}
          >
            {cred.emailVerified || <Verification email={cred.email} />}
            <Page isLoading={!(user && studies)}>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/welcome" component={Welcome} />
                <Route path="/fetch" component={FetchStudy} />
                <Route path="/create/:nctID/:tab" component={CreateStudy} />
                <Route path="/study/:nctID/:tab" component={ViewStudy} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/account" component={Account} />
                <Route path="/feedback" component={Feedback} />
                <Redirect to="/" />
              </Switch>
            </Page>
          </Box>
        </StudiesContext.Provider>
      </UserContext.Provider>
    </Flex>
  );
}

export default Internal;
