import React from "react";
import {Card, List, Media} from "reactstrap";
import "./styles.css"

type UserInfo = {
  id: string,
  name: string,
  lastname: string
}

type Props = {
  users: UserInfo[]
}

function UsersList({users}: Props) {
  return (
      <>
        <Card className="bg-transparent border-0">
          <List type="unstyled">
            {users.map((x) => (
              <Media key={x.id} className="align-items-center">
                <div>
                <span className="avatar avatar-sm rounded-circle ">
                  <img
                      alt="..."
                      src={require("../../assets/img/no_avatar.png")}
                  />
                </span>
                </div>
                <Media className="ml-2 d-lg-block">
                  <span className="mb-0 text-sm text-white font-weight-bold">
                    {x.name + ' ' + x.lastname}
                  </span>
                </Media>
              </Media>
            ))
            }
          </List>
        </Card>
      </>
  )
}

export default UsersList;