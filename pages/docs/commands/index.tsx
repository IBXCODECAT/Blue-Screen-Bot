import React from "react"
import { InferGetServerSidePropsType } from "next"
import { getGlobalCommands } from "services/discord"
import { APIApplicationCommand, ApplicationCommandType } from "discord-api-types/v10"

export const getServerSideProps = async () => {
  try {
    const { data } = await getGlobalCommands()
    
    const slashCommands: APIApplicationCommand[] = [];

    for(let i = 0; i < data.length; i++)
    {
      if(data[i].type == ApplicationCommandType.ChatInput)
      {
        slashCommands.push(data[i]);
      }
    }
    return { props: { slashCommands } }
  } catch (err) {
    console.error(err)
    return { props: { slashCommands: null } }
  }
}

const CommandsPage = ({ slashCommands }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const render = (
    <div>
      <h1>Blue Screen Bot Documentation</h1>
      <h2>Commands</h2>
      {slashCommands && slashCommands.length > 0 ? (
      <div>
        <table>
          <thead>
            <tr>
              <th>Command Name</th>
              <th>Command Description</th>
            </tr>
          </thead>
          <tbody>
            {slashCommands.map((command) => (
              <tr key={command.id}>
                <td>
                  <a href="#">{command.name}</a> 
                </td>
                <td>{command.description} </td>
              </tr>
            ))}
          </tbody>
          
        </table>

      </div>
      ) : (
        "There was an error fetching the commands to display here."
      )}
    </div>
  );

  return render;
}

export default CommandsPage;