import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_price_sections_groups_rows_price_mode" AS ENUM('single', 'tiered');
  CREATE TYPE "public"."enum_documents_category" AS ENUM('organization', 'legal', 'other', 'certificates');
  CREATE TABLE "files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "service_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"mobile_image_id" integer,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "treatments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"body" varchar,
  	"image_id" integer,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "specialists" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"service_category_id" integer,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"teaser" varchar,
  	"group" varchar,
  	"date" timestamp(3) with time zone,
  	"image_id" integer NOT NULL,
  	"home_image_id" integer,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"service_categories_id" integer
  );
  
  CREATE TABLE "offers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"short_title" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"image_id" integer NOT NULL,
  	"treatment_id" integer,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "results" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"alt" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"treatment_id" integer,
  	"show_on_home" boolean DEFAULT true,
  	"show_on_about" boolean DEFAULT true,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"story" varchar NOT NULL,
  	"liked" varchar NOT NULL,
  	"date" timestamp(3) with time zone,
  	"rating" numeric DEFAULT 5,
  	"specialist_id" integer,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "price_sections_groups_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"mis" varchar,
  	"name" varchar NOT NULL,
  	"duration" varchar,
  	"price1" varchar,
  	"price2" varchar,
  	"price3" varchar,
  	"price_mode" "enum_price_sections_groups_rows_price_mode" DEFAULT 'single',
  	"treatment_id" integer
  );
  
  CREATE TABLE "price_sections_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"min_price" varchar,
  	"note" varchar
  );
  
  CREATE TABLE "price_sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category_id" integer,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"category" "enum_documents_category" NOT NULL,
  	"file_id" integer,
  	"sort_order" numeric DEFAULT 100,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "page_copy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"intro" varchar,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"full_address" varchar,
  	"phone" varchar,
  	"hotline" varchar,
  	"messenger_phone" varchar,
  	"email" varchar,
  	"analysis_email" varchar,
  	"hours" varchar,
  	"telegram_url" varchar,
  	"map_url" varchar,
  	"longitude" numeric,
  	"latitude" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar,
  	"hero_description" varchar,
  	"hero_image_id" integer,
  	"services_intro" varchar,
  	"surgery_title" varchar,
  	"surgery_description" varchar,
  	"equipment_description" varchar,
  	"surgery_image_id" integer,
  	"results_intro" varchar,
  	"specialists_intro" varchar,
  	"projects_intro" varchar,
  	"work_intro" varchar,
  	"work_image_id" integer,
  	"reviews_intro" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro" varchar,
  	"room_image_id" integer,
  	"overview" varchar,
  	"equipment" varchar,
  	"stationary_intro" varchar,
  	"stationary_care" varchar,
  	"stationary_surgery" varchar,
  	"results_intro" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"service_categories_id" integer
  );
  
  ALTER TABLE "media" ADD COLUMN "source_path" varchar;
  ALTER TABLE "news" ADD COLUMN "service_category_id" integer;
  ALTER TABLE "news" ADD COLUMN "project_id" integer;
  ALTER TABLE "_news_v" ADD COLUMN "version_service_category_id" integer;
  ALTER TABLE "_news_v" ADD COLUMN "version_project_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "files_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "treatments_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "specialists_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "offers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "results_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reviews_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "price_sections_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "page_copy_id" integer;
  ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_categories" ADD CONSTRAINT "service_categories_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments" ADD CONSTRAINT "treatments_category_id_service_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "treatments" ADD CONSTRAINT "treatments_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "specialists" ADD CONSTRAINT "specialists_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "specialists" ADD CONSTRAINT "specialists_service_category_id_service_categories_id_fk" FOREIGN KEY ("service_category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_home_image_id_media_id_fk" FOREIGN KEY ("home_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_service_categories_fk" FOREIGN KEY ("service_categories_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offers" ADD CONSTRAINT "offers_treatment_id_treatments_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_treatment_id_treatments_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_specialist_id_specialists_id_fk" FOREIGN KEY ("specialist_id") REFERENCES "public"."specialists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "price_sections_groups_rows" ADD CONSTRAINT "price_sections_groups_rows_treatment_id_treatments_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "public"."treatments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "price_sections_groups_rows" ADD CONSTRAINT "price_sections_groups_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."price_sections_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "price_sections_groups" ADD CONSTRAINT "price_sections_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."price_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "price_sections" ADD CONSTRAINT "price_sections_category_id_service_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_statistics" ADD CONSTRAINT "home_page_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_facts" ADD CONSTRAINT "home_page_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_surgery_image_id_media_id_fk" FOREIGN KEY ("surgery_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_work_image_id_media_id_fk" FOREIGN KEY ("work_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_room_image_id_media_id_fk" FOREIGN KEY ("room_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_rels" ADD CONSTRAINT "about_page_rels_service_categories_fk" FOREIGN KEY ("service_categories_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "files_updated_at_idx" ON "files" USING btree ("updated_at");
  CREATE INDEX "files_created_at_idx" ON "files" USING btree ("created_at");
  CREATE UNIQUE INDEX "files_filename_idx" ON "files" USING btree ("filename");
  CREATE UNIQUE INDEX "service_categories_slug_idx" ON "service_categories" USING btree ("slug");
  CREATE INDEX "service_categories_image_idx" ON "service_categories" USING btree ("image_id");
  CREATE INDEX "service_categories_mobile_image_idx" ON "service_categories" USING btree ("mobile_image_id");
  CREATE INDEX "service_categories_updated_at_idx" ON "service_categories" USING btree ("updated_at");
  CREATE INDEX "service_categories_created_at_idx" ON "service_categories" USING btree ("created_at");
  CREATE INDEX "treatments_category_idx" ON "treatments" USING btree ("category_id");
  CREATE INDEX "treatments_image_idx" ON "treatments" USING btree ("image_id");
  CREATE INDEX "treatments_updated_at_idx" ON "treatments" USING btree ("updated_at");
  CREATE INDEX "treatments_created_at_idx" ON "treatments" USING btree ("created_at");
  CREATE UNIQUE INDEX "category_slug_idx" ON "treatments" USING btree ("category_id","slug");
  CREATE UNIQUE INDEX "specialists_slug_idx" ON "specialists" USING btree ("slug");
  CREATE INDEX "specialists_image_idx" ON "specialists" USING btree ("image_id");
  CREATE INDEX "specialists_service_category_idx" ON "specialists" USING btree ("service_category_id");
  CREATE INDEX "specialists_updated_at_idx" ON "specialists" USING btree ("updated_at");
  CREATE INDEX "specialists_created_at_idx" ON "specialists" USING btree ("created_at");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_image_idx" ON "projects" USING btree ("image_id");
  CREATE INDEX "projects_home_image_idx" ON "projects" USING btree ("home_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_service_categories_id_idx" ON "projects_rels" USING btree ("service_categories_id");
  CREATE UNIQUE INDEX "offers_slug_idx" ON "offers" USING btree ("slug");
  CREATE INDEX "offers_image_idx" ON "offers" USING btree ("image_id");
  CREATE INDEX "offers_treatment_idx" ON "offers" USING btree ("treatment_id");
  CREATE INDEX "offers_updated_at_idx" ON "offers" USING btree ("updated_at");
  CREATE INDEX "offers_created_at_idx" ON "offers" USING btree ("created_at");
  CREATE INDEX "results_image_idx" ON "results" USING btree ("image_id");
  CREATE INDEX "results_treatment_idx" ON "results" USING btree ("treatment_id");
  CREATE INDEX "results_updated_at_idx" ON "results" USING btree ("updated_at");
  CREATE INDEX "results_created_at_idx" ON "results" USING btree ("created_at");
  CREATE INDEX "reviews_specialist_idx" ON "reviews" USING btree ("specialist_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "price_sections_groups_rows_order_idx" ON "price_sections_groups_rows" USING btree ("_order");
  CREATE INDEX "price_sections_groups_rows_parent_id_idx" ON "price_sections_groups_rows" USING btree ("_parent_id");
  CREATE INDEX "price_sections_groups_rows_treatment_idx" ON "price_sections_groups_rows" USING btree ("treatment_id");
  CREATE INDEX "price_sections_groups_order_idx" ON "price_sections_groups" USING btree ("_order");
  CREATE INDEX "price_sections_groups_parent_id_idx" ON "price_sections_groups" USING btree ("_parent_id");
  CREATE INDEX "price_sections_category_idx" ON "price_sections" USING btree ("category_id");
  CREATE INDEX "price_sections_updated_at_idx" ON "price_sections" USING btree ("updated_at");
  CREATE INDEX "price_sections_created_at_idx" ON "price_sections" USING btree ("created_at");
  CREATE INDEX "documents_file_idx" ON "documents" USING btree ("file_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "page_copy_slug_idx" ON "page_copy" USING btree ("slug");
  CREATE INDEX "page_copy_updated_at_idx" ON "page_copy" USING btree ("updated_at");
  CREATE INDEX "page_copy_created_at_idx" ON "page_copy" USING btree ("created_at");
  CREATE INDEX "home_page_statistics_order_idx" ON "home_page_statistics" USING btree ("_order");
  CREATE INDEX "home_page_statistics_parent_id_idx" ON "home_page_statistics" USING btree ("_parent_id");
  CREATE INDEX "home_page_facts_order_idx" ON "home_page_facts" USING btree ("_order");
  CREATE INDEX "home_page_facts_parent_id_idx" ON "home_page_facts" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_image_idx" ON "home_page" USING btree ("hero_image_id");
  CREATE INDEX "home_page_surgery_image_idx" ON "home_page" USING btree ("surgery_image_id");
  CREATE INDEX "home_page_work_image_idx" ON "home_page" USING btree ("work_image_id");
  CREATE INDEX "about_page_room_image_idx" ON "about_page" USING btree ("room_image_id");
  CREATE INDEX "about_page_rels_order_idx" ON "about_page_rels" USING btree ("order");
  CREATE INDEX "about_page_rels_parent_idx" ON "about_page_rels" USING btree ("parent_id");
  CREATE INDEX "about_page_rels_path_idx" ON "about_page_rels" USING btree ("path");
  CREATE INDEX "about_page_rels_service_categories_id_idx" ON "about_page_rels" USING btree ("service_categories_id");
  ALTER TABLE "news" ADD CONSTRAINT "news_service_category_id_service_categories_id_fk" FOREIGN KEY ("service_category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_service_category_id_service_categories_id_fk" FOREIGN KEY ("version_service_category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_project_id_projects_id_fk" FOREIGN KEY ("version_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_files_fk" FOREIGN KEY ("files_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_categories_fk" FOREIGN KEY ("service_categories_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_treatments_fk" FOREIGN KEY ("treatments_id") REFERENCES "public"."treatments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_specialists_fk" FOREIGN KEY ("specialists_id") REFERENCES "public"."specialists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_offers_fk" FOREIGN KEY ("offers_id") REFERENCES "public"."offers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_results_fk" FOREIGN KEY ("results_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_price_sections_fk" FOREIGN KEY ("price_sections_id") REFERENCES "public"."price_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_page_copy_fk" FOREIGN KEY ("page_copy_id") REFERENCES "public"."page_copy"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "news_service_category_idx" ON "news" USING btree ("service_category_id");
  CREATE INDEX "news_project_idx" ON "news" USING btree ("project_id");
  CREATE INDEX "_news_v_version_version_service_category_idx" ON "_news_v" USING btree ("version_service_category_id");
  CREATE INDEX "_news_v_version_version_project_idx" ON "_news_v" USING btree ("version_project_id");
  CREATE INDEX "payload_locked_documents_rels_files_id_idx" ON "payload_locked_documents_rels" USING btree ("files_id");
  CREATE INDEX "payload_locked_documents_rels_service_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("service_categories_id");
  CREATE INDEX "payload_locked_documents_rels_treatments_id_idx" ON "payload_locked_documents_rels" USING btree ("treatments_id");
  CREATE INDEX "payload_locked_documents_rels_specialists_id_idx" ON "payload_locked_documents_rels" USING btree ("specialists_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_offers_id_idx" ON "payload_locked_documents_rels" USING btree ("offers_id");
  CREATE INDEX "payload_locked_documents_rels_results_id_idx" ON "payload_locked_documents_rels" USING btree ("results_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_price_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("price_sections_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_page_copy_id_idx" ON "payload_locked_documents_rels" USING btree ("page_copy_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "files" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "treatments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "specialists" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "offers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "results" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "price_sections_groups_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "price_sections_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "price_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_copy" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "files" CASCADE;
  DROP TABLE "service_categories" CASCADE;
  DROP TABLE "treatments" CASCADE;
  DROP TABLE "specialists" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "offers" CASCADE;
  DROP TABLE "results" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "price_sections_groups_rows" CASCADE;
  DROP TABLE "price_sections_groups" CASCADE;
  DROP TABLE "price_sections" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "page_copy" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "home_page_statistics" CASCADE;
  DROP TABLE "home_page_facts" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_rels" CASCADE;
  ALTER TABLE "news" DROP CONSTRAINT "news_service_category_id_service_categories_id_fk";
  
  ALTER TABLE "news" DROP CONSTRAINT "news_project_id_projects_id_fk";
  
  ALTER TABLE "_news_v" DROP CONSTRAINT "_news_v_version_service_category_id_service_categories_id_fk";
  
  ALTER TABLE "_news_v" DROP CONSTRAINT "_news_v_version_project_id_projects_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_files_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_treatments_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_specialists_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_offers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_results_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reviews_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_price_sections_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_documents_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_page_copy_fk";
  
  DROP INDEX "news_service_category_idx";
  DROP INDEX "news_project_idx";
  DROP INDEX "_news_v_version_version_service_category_idx";
  DROP INDEX "_news_v_version_version_project_idx";
  DROP INDEX "payload_locked_documents_rels_files_id_idx";
  DROP INDEX "payload_locked_documents_rels_service_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_treatments_id_idx";
  DROP INDEX "payload_locked_documents_rels_specialists_id_idx";
  DROP INDEX "payload_locked_documents_rels_projects_id_idx";
  DROP INDEX "payload_locked_documents_rels_offers_id_idx";
  DROP INDEX "payload_locked_documents_rels_results_id_idx";
  DROP INDEX "payload_locked_documents_rels_reviews_id_idx";
  DROP INDEX "payload_locked_documents_rels_price_sections_id_idx";
  DROP INDEX "payload_locked_documents_rels_documents_id_idx";
  DROP INDEX "payload_locked_documents_rels_page_copy_id_idx";
  ALTER TABLE "media" DROP COLUMN "source_path";
  ALTER TABLE "news" DROP COLUMN "service_category_id";
  ALTER TABLE "news" DROP COLUMN "project_id";
  ALTER TABLE "_news_v" DROP COLUMN "version_service_category_id";
  ALTER TABLE "_news_v" DROP COLUMN "version_project_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "files_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "treatments_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "specialists_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "offers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "results_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reviews_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "price_sections_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "documents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "page_copy_id";
  DROP TYPE "public"."enum_price_sections_groups_rows_price_mode";
  DROP TYPE "public"."enum_documents_category";`)
}

