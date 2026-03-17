import { useEffect, useState } from "react";

export const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleChange}
            />
            <span className="search-icon" aria-hidden="true">⌕</span>
        </div>
    );
};

export const FilterBar = ({ filters, onFilterChange }) => {
    const [activeFilters, setActiveFilters] = useState({});

    const handleFilterChange = (filterKey, value) => {
        const updated = { ...activeFilters, [filterKey]: value };
        setActiveFilters(updated);
        onFilterChange(updated);
    };

    return (
        <div className="filter-bar">
            {filters.map((filter) => (
                <div key={filter.key} className="filter-group">
                    <label className="filter-label">{filter.label}</label>
                    <select
                        className="filter-select"
                        value={activeFilters[filter.key] || ""}
                        onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    >
                        <option value="">All</option>
                        {filter.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};

export const StatCard = ({ title, value, icon, color = "var(--blue-deep)", trend = null }) => (
    <div className="stat-card" style={{ "--accent-color": color }}>
        <div className="stat-header">
            <span className="stat-icon" aria-hidden="true">{icon}</span>
            <h4 className="stat-title">{title}</h4>
        </div>
        <div className="stat-value">{value}</div>
        {trend !== null && (
            <div className={`stat-trend ${trend >= 0 ? "up" : "down"}`}>
                {trend >= 0 ? "+" : "-"}{Math.abs(trend)}%
            </div>
        )}
    </div>
);

export const ProgressBar = ({ percentage, label, color = "var(--success)" }) => (
    <div className="progress-container">
        <div className="progress-meta">
            <span className="progress-label">{label}</span>
            <span className="progress-percentage">{percentage}%</span>
        </div>
        <div className="progress-bar">
            <div
                className="progress-fill"
                style={{
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, ${color}, ${color})`,
                }}
            />
        </div>
    </div>
);

export const StatusBadge = ({ status, size = "medium" }) => {
    const normalizedStatus = String(status || "pending").toLowerCase();
    return (
        <span className={`status-badge status-${normalizedStatus} ${size === "small" ? "small" : ""}`}>
            {normalizedStatus}
        </span>
    );
};

export const SimpleChart = ({ data, title, type = "bar" }) => {
    const maxValue = Math.max(...data.map((item) => item.value), 1);

    return (
        <div className="chart-container">
            <h3 className="chart-title">{title}</h3>
            <div className="chart-content">
                {type === "bar" && (
                    <div className="bar-chart">
                        {data.map((item) => (
                            <div key={item.label} className="bar-item">
                                <div className="bar-label">{item.label}</div>
                                <div className="bar-wrapper">
                                    <div
                                        className="bar"
                                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                                    />
                                </div>
                                <div className="bar-value">{item.value}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export const AnalyticsCard = ({ title, stats, chart }) => (
    <div className="analytics-card">
        <h3 className="analytics-title">{title}</h3>
        <div className="analytics-stats">
            {stats.map((stat) => (
                <div key={stat.name} className="analytics-stat">
                    <span className="stat-name">{stat.name}</span>
                    <span className="stat-num">{stat.value}</span>
                </div>
            ))}
        </div>
        {chart && <SimpleChart data={chart.data} title={chart.title} />}
    </div>
);

export const ActivityFeed = ({ activities }) => (
    <div className="activity-feed">
        <h3 className="activity-title">Recent Activity</h3>
        <div className="activity-list">
            {activities.map((activity, idx) => (
                <div key={`${activity.action}-${idx}`} className="activity-item">
                    <div className="activity-dot" style={{ background: activity.color }} />
                    <div className="activity-content">
                        <p className="activity-action">{activity.action}</p>
                        <p className="activity-time">{activity.time}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const SkeletonLoader = ({ count = 3, height = "100px" }) => (
    <div className="skeleton-container">
        {Array.from({ length: count }).map((_, idx) => (
            <div
                key={idx}
                className="skeleton"
                style={{ height }}
            />
        ))}
    </div>
);

export const Toast = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast toast-${type}`}>
            {message}
        </div>
    );
};
