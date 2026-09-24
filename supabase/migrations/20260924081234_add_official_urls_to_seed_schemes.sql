update public.schemes
set official_url = case id
  when '2e54dc41-1690-4a8a-9ccd-9c247ce5b3d1'::uuid then 'https://pmkisan.gov.in/'
  when 'd12875a4-f5b2-4f1a-8a18-b1a90b46e80c'::uuid then 'https://scholarships.gov.in/Students'
  when '20c1bb6a-017d-4f0d-a16a-42fdf4a79d12'::uuid then 'https://www.skillindiadigital.gov.in/pmkvy-dashboard'
  else official_url
end,
updated_at = now()
where id in (
  '2e54dc41-1690-4a8a-9ccd-9c247ce5b3d1'::uuid,
  'd12875a4-f5b2-4f1a-8a18-b1a90b46e80c'::uuid,
  '20c1bb6a-017d-4f0d-a16a-42fdf4a79d12'::uuid
);
