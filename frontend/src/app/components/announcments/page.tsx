

export default function AnnouncementsPage() {
    return (
    <><div className="announcement-container">
            <div className="announcement-header">
                <h1 className="announcement-title">Announcements</h1>
                <span className="announcement-view-all">View all</span>
            </div>
        </div>
            <div className="announcement-list">
                {data[0] && (

                    <div className="announcement-item">
                        <div className="announcement-item-inside">
                            <h2 className="announcement-item-title">New Feature Release</h2>
                            <span className="announcement-item-description">We are excited to announce the release of our new feature!</p>
                        </div>
                    </div>

                )}
            </div>
            );
}