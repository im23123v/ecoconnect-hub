-- Create enum for request status
CREATE TYPE public.request_status AS ENUM ('pending', 'acknowledged', 'in_transit', 'delivered');

-- Create enum for request type
CREATE TYPE public.request_type AS ENUM ('waste_pickup', 'blood_donation', 'blood_request');

-- Create requests table for tracking all types of requests
CREATE TABLE public.requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  request_type request_type NOT NULL,
  location_id UUID REFERENCES public.locations(id),
  status request_status NOT NULL DEFAULT 'pending',
  description TEXT,
  blood_type TEXT,
  units_needed INTEGER,
  urgency TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create requests
CREATE POLICY "Anyone can create requests"
ON public.requests
FOR INSERT
WITH CHECK (true);

-- Allow anyone to view requests (for tracking)
CREATE POLICY "Anyone can view requests"
ON public.requests
FOR SELECT
USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_requests_updated_at
BEFORE UPDATE ON public.requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();