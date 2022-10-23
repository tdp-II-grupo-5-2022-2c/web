import React from "react";
import {Card, List, Media} from "reactstrap";
import "./styles.css"

type UserInfo = {
  user_id: number,
  name: string
}

type Props = {
  users: UserInfo[]
}

function UsersList({users}: Props) {
  return (
      <>
        {/*TODO: messages-container es de chat, se podría sacar de ahi y usar en general.*/}
        <Card className="bg-transparent border-0">
          <List type="unstyled">
            {users.map((x) => (
              <Media key={x.user_id} className="align-items-center">
                <div>
                <span className="avatar avatar-sm rounded-circle ">
                  <img
                      alt="..."
                      src={require("../../assets/img/no_avatar.png")}
                  />
                </span>
                </div>
                <Media className="ml-2 d-lg-block">
                  <span className="mb-0 text-sm font-weight-bold">
                    {x.name}
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