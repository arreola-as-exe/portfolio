import { IEntryModel } from "@/domain/types"
import {
  EntryCardLayoutComponents as CardLayout,
  EntryCardDataComponents as Entry,
} from "./composition"

export const EntryCard: React.FC<{
  entry: IEntryModel
}> = ({ entry }) => {
  return (
    <CardLayout.Container data={entry}>
      <CardLayout.Background.Image />
      <CardLayout.Body>
        <CardLayout.LeftPanel>
          <Entry.Title className="mb-2" />
          <Entry.Description className="mb-2" />
          <Entry.Badges className="group-[.open]:mt-auto group-[.open]:mb-3" />
        </CardLayout.LeftPanel>
        <CardLayout.RightPanel>
          <Entry.Date />
          <Entry.Brand />
        </CardLayout.RightPanel>
      </CardLayout.Body>
    </CardLayout.Container>
  )
}
