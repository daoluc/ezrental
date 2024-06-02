import { Document } from 'mongoose';

export interface Item extends Document {
    name: string,
    hostid?: string,
    price: Price,
    photos: string[],
    description: string,
    status: string,
    category: string,
    numberOfBookings?: number,
}

export interface Booking extends Document {
    itemid?: string,
    guestid?: string,
    rentstart: Date,
    rentend: Date,
    duration: number,
    durationtype: string,
    amount: number,
    comment: string,
    rating: number,
    stripeid?: string,
    status: BookingStatus,
}

export enum BookingStatus {
    Pending = "PENDING",
    Approved = "APPROVED",
    Returned = "RETURNED",
    CANCELLED = "CANCELLED",    
}

export type Price = {
    daily: number,
    hourly: number,
}

export type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: Date;
    phone: string;
};

export enum ItemStatus {
    LISTED = 'listed',
    UNLISTED = 'unlisted'
}