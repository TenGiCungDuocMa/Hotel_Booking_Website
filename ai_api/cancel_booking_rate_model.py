from pydantic import BaseModel

class BookingInput(BaseModel):
    lead_time: int
    arrival_date_month: str
    arrival_date_week_number: int
    arrival_date_day_of_month: int
    stays_in_weekend_nights: int
    stays_in_week_nights: int
    adults: int
    children: float
    babies: int
    is_repeated_guest: int
    previous_cancellations: int
    previous_bookings_not_canceled: int
    days_in_waiting_list: int
    adr: float
    total_of_special_requests: int
