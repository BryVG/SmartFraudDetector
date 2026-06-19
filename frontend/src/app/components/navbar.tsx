
import Image from "next/image";

export default function Navbar() {
  return (
    <div style={styles.navbarcontainer}>
      <div style={styles.searchbar}>
        <Image src="/search.png" alt="" width={15} height={15} />
         <input
          type="text"
          placeholder="Search..."
          style={styles.input}
        />
      </div>
      <div style={styles.navbarCenter}>
            <div style={styles.navbarEnd}>
                <Image src="/message.png" alt="" width={20} height={20} />
            </div>
            <div style={{...styles.navbarEnd, position: "relative"}}>
                <Image src="/message.png" alt="" width={20} height={20} />
                <div style={styles.navbarEndin}>
                    1
                </div>
            </div>
            <div style={styles.navbarUser}>
                <span style={styles.navbarUserName}>John Doe</span>
                <span style={styles.navbarUserRole}>
                    <p>name EXAMPLE</p>
                </span>
            </div>
      </div>
    </div>
  );
}

const styles = {
  navbarcontainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px"
  },

  searchbar: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.75rem",
    borderRadius: "9999px",
    border: "1.5px solid #d1d5db",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
  input: {width: "200px", padding: "0.5rem", backgroundColor: "transparent", outline: "none"},

  navbarStart: {},

  navbarCenter: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    justifyContent: "end",
    width: "100%",
  },    

  navbarEnd: {backgroundColor: "white", width: "28px", height: "28px", display: "flex", alignItems: "center",  cursor: "pointer",bordercolor: "#d1d5db", borderWidth: "1.5px", borderStyle: "solid", borderRadius: "9999px", justifyContent: "center"},
  navbarEndin: {backgroundColor: "purple", color: "white", borderRadius: "9999px", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "absolute" as const, top: "-12px", right: "-12px"},
  navbarUser: {display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "0.25rem"},
  navbarUserName: {fontSize: "0.75rem", fontWeight: "bold"},
  navbarUserRole: {fontSize: "0.625rem", color: "#6b7280"},
  menu: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
  },

  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  button: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};