import { SidebarWrapper } from "@/components/common/SidebarWrapper/SidebarWrapper";
import { TeamSettingsContainer } from "@/components/teams/TeamSettingsContainer/TeamSettingsContainer";
import { useIsSidebarOpen } from "@/store/isSidebarOpen";

export default function Hoge() {
  const isSidebarOpen = useIsSidebarOpen((state) => state.isOpen);
  const toggleSidebar = useIsSidebarOpen((state) => state.toggleOpen);

  return (
    <>
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? "open" : "close"}
      </button>
      <div style={{ display: "flex", gap: 5 }}>
        <div style={{ width: 400, height: 200, background: "red" }}>aaa</div>
        <div style={{ width: 400, height: 200, background: "red" }}>aaa</div>
        <div style={{ width: 400, height: 200, background: "red" }}>aaa</div>

        <div style={{ width: isSidebarOpen ? 400 : 0 }}>
          <SidebarWrapper width={300}>
            <div style={{ marginRight: 16 }}>
              <TeamSettingsContainer
                teamName="技育CAMPのアイデア出しをサポーターズ"
                invitationCode="#0OilIL"
                estimatedTechList={[
                  {
                    id: "1",
                    label: "TypeScript",
                    users: [
                      { id: "1", name: "user1", level: "beginner" },
                      { id: "2", name: "user2", level: "advanced" },
                      { id: "3", name: "user3", level: "advanced" },
                    ],
                    actionType: "minus",
                    onActionClick: () => console.log("click"),
                    leftSlot: <></>,
                  },
                  {
                    id: "2",
                    label: "Node.js",
                    users: [
                      { id: "1", name: "user1", level: "beginner" },
                      { id: "3", name: "user3", level: "expert" },
                    ],
                    actionType: "minus",
                    onActionClick: () => console.log("click"),
                    leftSlot: <></>,
                  },
                ]}
                memberHasTechList={[
                  {
                    id: "1",
                    label: "TypeScript",
                    users: [
                      { id: "1", name: "user1", level: "beginner" },
                      { id: "2", name: "user2", level: "advanced" },
                      { id: "3", name: "user3", level: "advanced" },
                    ],
                    actionType: "plus",
                    onActionClick: () => console.log("click"),
                    leftSlot: <></>,
                  },
                ]}
                onClose={() => console.log("close")}
              />
            </div>
          </SidebarWrapper>
        </div>
      </div>
    </>
  );
}
