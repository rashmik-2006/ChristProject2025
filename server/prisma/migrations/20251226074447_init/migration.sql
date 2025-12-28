-- CreateTable
CREATE TABLE "internship_offers" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact_info" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hr_contact" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "required_skills" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "work_mode" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "application_date" TIMESTAMP(3) NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL,
    "completion_date" TIMESTAMP(3) NOT NULL,
    "remuneration" TEXT NOT NULL,
    "stipend" TEXT NOT NULL,
    "eligible_for_credits" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "internship_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "gpa" DECIMAL(65,30) NOT NULL,
    "resume_url" TEXT NOT NULL,
    "cover_letter" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "offer_id" TEXT NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "internship_offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
