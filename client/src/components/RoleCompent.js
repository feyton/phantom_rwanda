import React from 'react';

function RoleComponent({ role }) {
  const { name, permissions } = role;
  const handleEdit = () => {};

  return (
    <ul className="font-raleway capitalize grid grid-cols-[30%_60%] gap-1 border-b-2 py-1">
      <li className="font-bold  text-primary">
        <span className="cursor-pointer" onClick={handleEdit}>
          {name}
        </span>
      </li>
      <li>
        <ul>
          {permissions.map((p, index) => {
            return (
              <div
                className="grid grid-cols-2 py-2 justify-center center border-b "
                key={`${p.object}-${name}-${index}`}
              >
                <li className="text-black ">{p.object}</li>
                <li className="py-1 flex flex-wrap lg:inline-block">
                  {p.perms.map((pr, ind) => {
                    return (
                      <span
                        key={`${p.object}-${name}-${ind}`}
                        className={`mx-2 my-1 lg:my-0 uppercase bg-${pr} bg-opacity-75 cursor-pointer text-white py-1 px-2 rounded-sm font-bold`}
                      >
                        {pr}
                      </span>
                    );
                  })}
                </li>
              </div>
            );
          })}
        </ul>
      </li>
      <li>{}</li>
    </ul>
  );
}

export default RoleComponent;
