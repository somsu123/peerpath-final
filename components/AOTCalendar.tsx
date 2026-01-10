
import React, { useState, useEffect, useMemo } from 'react';
import { CalendarEvent, EventType, User as UserType } from '../types';
import { Calendar, Plus, X, ChevronLeft, ChevronRight, Clock, MapPin, User, AlertCircle } from 'lucide-react';

interface AOTCalendarProps {
    currentUser?: UserType | null;
}

const EVENT_TYPES: EventType[] = ['Academic', 'Cultural', 'Technical', 'Sports', 'Holiday'];

const EVENT_COLORS: Record<EventType, string> = {
    Academic: 'bg-blue-500',
    Cultural: 'bg-purple-500',
    Technical: 'bg-indigo-600',
    Sports: 'bg-green-500',
    Holiday: 'bg-amber-500'
};

const AOTCalendar: React.FC<AOTCalendarProps> = ({ currentUser }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        eventType: 'Academic' as EventType
    });

    // Load events from localStorage
    useEffect(() => {
        const savedEvents = localStorage.getItem('aot_calendar_events');
        if (savedEvents) {
            const parsed = JSON.parse(savedEvents);
            setEvents(parsed.map((e: any) => ({
                ...e,
                date: new Date(e.date),
                createdAt: new Date(e.createdAt)
            })));
        } else {
            // Add some sample events
            const sampleEvents: CalendarEvent[] = [
                {
                    id: '1',
                    title: 'Mid-Semester Exams',
                    description: 'Mid-semester examinations for all departments',
                    date: new Date(2026, 0, 20),
                    eventType: 'Academic',
                    createdBy: 'Admin',
                    createdAt: new Date()
                },
                {
                    id: '2',
                    title: 'Tech Fest 2026',
                    description: 'Annual technical festival with coding competitions and workshops',
                    date: new Date(2026, 1, 15),
                    eventType: 'Technical',
                    createdBy: 'Admin',
                    createdAt: new Date()
                },
                {
                    id: '3',
                    title: 'Republic Day Celebration',
                    description: 'Republic Day celebration at AOT campus',
                    date: new Date(2026, 0, 26),
                    eventType: 'Holiday',
                    createdBy: 'Admin',
                    createdAt: new Date()
                }
            ];
            setEvents(sampleEvents);
            localStorage.setItem('aot_calendar_events', JSON.stringify(sampleEvents));
        }
    }, []);

    // Save events to localStorage
    useEffect(() => {
        if (events.length > 0) {
            localStorage.setItem('aot_calendar_events', JSON.stringify(events));
        }
    }, [events]);

    const isRepresentative = currentUser?.isRepresentative || false;

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek, year, month };
    };

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);

    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    const getEventsForDate = (day: number) => {
        return events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === day &&
                eventDate.getMonth() === month &&
                eventDate.getFullYear() === year;
        });
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleCreateEvent = () => {
        if (!currentUser) {
            alert('Please login to create events');
            return;
        }

        if (!newEvent.title || !newEvent.date) {
            alert('Please fill in all required fields');
            return;
        }

        const event: CalendarEvent = {
            id: Math.random().toString(36).substr(2, 9),
            title: newEvent.title,
            description: newEvent.description,
            date: new Date(newEvent.date),
            eventType: newEvent.eventType,
            createdBy: currentUser.name,
            createdAt: new Date()
        };

        setEvents([...events, event]);
        setIsCreateModalOpen(false);
        setNewEvent({ title: '', description: '', date: '', eventType: 'Academic' });
    };

    const handleDeleteEvent = (event: CalendarEvent) => {
        const canDelete = isRepresentative || event.createdBy === currentUser?.name || event.createdBy === 'Admin';

        if (!canDelete) {
            alert('You can only delete your own events or if you are a representative.');
            return;
        }
        if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
            setEvents(events.filter(e => e.id !== event.id));
            setSelectedEvent(null);
        }
    };

    const upcomingEvents = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return events
            .filter(e => new Date(e.date) >= today)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5);
    }, [events]);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg">
                            <Calendar className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">AOT Calendar</h1>
                            <p className="text-slate-500 font-semibold mt-1">Track important college events and dates</p>
                        </div>
                    </div>

                    {currentUser && (
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                        >
                            <Plus className="w-5 h-5" />
                            Add Event
                        </button>
                    )}
                </div>

                {currentUser && !isRepresentative && (
                    <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-indigo-800">Community Access</p>
                            <p className="text-xs font-semibold text-indigo-600 mt-1">
                                You can now add personal reminders and peer events to the calendar!
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar Grid */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
                        {/* Calendar Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-black text-slate-900">{monthName}</h2>
                                <div className="relative group">
                                    <input
                                        type="month"
                                        value={`${year}-${(month + 1).toString().padStart(2, '0')}`}
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                const [y, m] = e.target.value.split('-').map(Number);
                                                setCurrentDate(new Date(y, m - 1, 1));
                                            }
                                        }}
                                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                                        title="Jump to date"
                                    />
                                    <button className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all flex items-center gap-2">
                                        Jump to Date
                                        <Calendar className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrevMonth}
                                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                                </button>
                                <button
                                    onClick={handleNextMonth}
                                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-2 mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-center text-xs font-black text-slate-400 uppercase tracking-widest py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <div className="grid grid-cols-7 gap-2">
                            {/* Empty cells for days before month starts */}
                            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                                <div key={`empty-${i}`} className="aspect-square" />
                            ))}

                            {/* Days of the month */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const dayEvents = getEventsForDate(day);
                                const isToday = new Date().getDate() === day &&
                                    new Date().getMonth() === month &&
                                    new Date().getFullYear() === year;

                                return (
                                    <div
                                        key={day}
                                        className={`aspect-square p-2 rounded-xl border transition-all cursor-pointer
                      ${isToday
                                                ? 'bg-indigo-50 border-indigo-600 font-black'
                                                : 'bg-slate-50 border-slate-100 hover:border-indigo-200'
                                            }`}
                                    >
                                        <div className={`text-sm font-bold mb-1 ${isToday ? 'text-indigo-600' : 'text-slate-900'}`}>
                                            {day}
                                        </div>
                                        <div className="space-y-1">
                                            {dayEvents.slice(0, 2).map(event => (
                                                <button
                                                    key={event.id}
                                                    onClick={() => setSelectedEvent(event)}
                                                    className={`w-full h-1.5 rounded-full ${EVENT_COLORS[event.eventType]} hover:opacity-80 transition-opacity`}
                                                    title={event.title}
                                                />
                                            ))}
                                            {dayEvents.length > 2 && (
                                                <div className="text-[8px] font-bold text-slate-400 text-center">
                                                    +{dayEvents.length - 2}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Legend */}
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Event Types</p>
                            <div className="flex flex-wrap gap-4">
                                {EVENT_TYPES.map(type => (
                                    <div key={type} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${EVENT_COLORS[type]}`} />
                                        <span className="text-sm font-semibold text-slate-600">{type}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm sticky top-24">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-6">Upcoming Events</h3>

                        {upcomingEvents.length === 0 ? (
                            <div className="text-center py-10">
                                <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                <p className="text-sm font-semibold text-slate-400">No upcoming events</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingEvents.map(event => (
                                    <button
                                        key={event.id}
                                        onClick={() => setSelectedEvent(event)}
                                        className="w-full text-left p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-indigo-200 transition-all group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-2 h-2 rounded-full ${EVENT_COLORS[event.eventType]} mt-2 flex-shrink-0`} />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                    {event.title}
                                                </h4>
                                                <p className="text-xs font-semibold text-slate-500 mt-1">
                                                    {new Date(event.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Event Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black text-slate-900">Create Event</h2>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                    Event Title *
                                </label>
                                <input
                                    type="text"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none font-semibold"
                                    placeholder="Enter event title"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none font-semibold resize-none"
                                    rows={3}
                                    placeholder="Enter event description"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                    Event Date *
                                </label>
                                <input
                                    type="date"
                                    value={newEvent.date}
                                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                    Event Type
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {EVENT_TYPES.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setNewEvent({ ...newEvent, eventType: type })}
                                            className={`px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2
                        ${newEvent.eventType === type
                                                    ? 'bg-indigo-600 text-white shadow-lg'
                                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                                }`}
                                        >
                                            <div className={`w-2 h-2 rounded-full ${EVENT_COLORS[type]}`} />
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateEvent}
                                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                            >
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`px-3 py-1 rounded-full text-xs font-black text-white ${EVENT_COLORS[selectedEvent.eventType]}`}>
                                {selectedEvent.eventType}
                            </div>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 mb-4">{selectedEvent.title}</h2>

                        {selectedEvent.description && (
                            <p className="text-slate-600 font-semibold mb-6">{selectedEvent.description}</p>
                        )}

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm">
                                <Clock className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold text-slate-600">
                                    {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <User className="w-5 h-5 text-slate-400" />
                                <span className="font-semibold text-slate-600">Created by {selectedEvent.createdBy}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {(isRepresentative || selectedEvent.createdBy === currentUser?.name) && (
                                <button
                                    onClick={() => handleDeleteEvent(selectedEvent)}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all"
                                >
                                    Delete Event
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AOTCalendar;
