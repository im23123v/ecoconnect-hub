-- Add tracking fields to requests table
ALTER TABLE public.requests 
ADD COLUMN IF NOT EXISTS donor_name text,
ADD COLUMN IF NOT EXISTS donor_email text,
ADD COLUMN IF NOT EXISTS donor_phone text,
ADD COLUMN IF NOT EXISTS acknowledged_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS pickup_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS in_transit_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS delivered_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS current_location text;

-- Update request_status enum to include more statuses
ALTER TYPE request_status ADD VALUE IF NOT EXISTS 'acknowledged';
ALTER TYPE request_status ADD VALUE IF NOT EXISTS 'pickup';
ALTER TYPE request_status ADD VALUE IF NOT EXISTS 'in_transit';
ALTER TYPE request_status ADD VALUE IF NOT EXISTS 'delivered';

-- Allow anyone to update requests (for donor acknowledgement)
CREATE POLICY "Anyone can update requests" 
ON public.requests 
FOR UPDATE 
USING (true)
WITH CHECK (true);