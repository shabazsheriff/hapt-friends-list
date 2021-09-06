import { IoStar, IoStarOutline, IoTrashOutline } from "react-icons/io5";
import NoResults from "./NoResults";

export default function UsersPerPage({
  data: users,
  deleteUser,
  addOrRemovefavourites,
}) {
  return (
    <>
      {users.length > 0 ? (
        users.map((user) => (
          <div className="list" key={user.id}>
            <div>
              <div className="user-name">{user.full_name}</div>
              <p className="caption">Is your friend</p>
            </div>
            <div className="actions">
              {user.is_favourite ? (
                <IoStar
                  className="star-icon image-border"
                  title={`Remove ${user.full_name} from favorites`}
                  onClick={() => addOrRemovefavourites(user.id)}
                />
              ) : (
                <IoStarOutline
                  className="star-icon image-border"
                  title={`Add ${user.full_name} to favorites`}
                  onClick={() => addOrRemovefavourites(user.id)}
                />
              )}

              <IoTrashOutline
                className="delete-icon image-border"
                title={`Delete ${user.full_name}`}
                onClick={() => deleteUser(user.id)}
              />
            </div>
          </div>
        ))
      ) : (
        <NoResults />
      )}
    </>
  );
}
