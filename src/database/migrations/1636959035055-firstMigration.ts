import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1636959035055 implements MigrationInterface {
    name = 'firstMigration1636959035055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "order_item_status_enum" AS ENUM('확인중', '주문 접수', '배달중', '배달 완료', '주문 취소', '교환', '환불')`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "count" integer NOT NULL, "status" "order_item_status_enum" NOT NULL DEFAULT '확인중', "orderId" uuid, "productId" uuid, "consumerId" uuid, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "total" integer NOT NULL, "destination" character varying NOT NULL DEFAULT '', "deliverRequest" character varying NOT NULL DEFAULT '문 앞', "orderedAt" character varying NOT NULL, "consumerId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "rating" integer NOT NULL, "images" text array NOT NULL, "reviewedAt" character varying NOT NULL, "commenterId" uuid, "productId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "refund_status_enum" AS ENUM('교환', '환불')`);
        await queryRunner.query(`CREATE TABLE "refund" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "refundedAt" character varying NOT NULL, "count" integer NOT NULL, "problemTitle" character varying NOT NULL, "problemDescription" character varying NOT NULL, "status" "refund_status_enum" NOT NULL, "recallPlace" character varying NOT NULL, "recallDay" TIMESTAMP NOT NULL, "recallTitle" character varying NOT NULL, "recallDescription" character varying, "sendPlace" character varying, "sendDay" TIMESTAMP, "refundPay" integer, "orderItemId" uuid, "refundeeId" uuid, CONSTRAINT "REL_94c9b30386ff638178cf039a13" UNIQUE ("orderItemId"), CONSTRAINT "PK_f1cefa2e60d99b206c46c1116e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('Consumer', 'Provider', 'Admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" text NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'Consumer', "verified" boolean NOT NULL DEFAULT false, "language" character varying NOT NULL DEFAULT 'Korean', "bio" character varying, "phoneNumber" character varying NOT NULL, "userImg" character varying, "address" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL DEFAULT '0', "images" text array NOT NULL, "infos" json, "avgRating" integer NOT NULL DEFAULT '0', "providerId" uuid, "categoryId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "coverImg" character varying, "slug" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" uuid, CONSTRAINT "REL_ade458116fb18e52062469c77c" UNIQUE ("createdById"), CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like_products_product" ("likeId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_f73ea029b86e9977fdcae56e9a2" PRIMARY KEY ("likeId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_64a87f4e01cc2aec274accb218" ON "like_products_product" ("likeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5fb8a80b127062b3b5964a3d45" ON "like_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_d7ffc97210bc743641768fc1234" FOREIGN KEY ("consumerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_d4cf70d1131119ae5ef00bde5b5" FOREIGN KEY ("consumerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2ecb712377c08a5504e89a25937" FOREIGN KEY ("commenterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refund" ADD CONSTRAINT "FK_94c9b30386ff638178cf039a131" FOREIGN KEY ("orderItemId") REFERENCES "order_item"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refund" ADD CONSTRAINT "FK_45eba69a2b8b83b63d55daa56a7" FOREIGN KEY ("refundeeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_ade458116fb18e52062469c77c0" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like_products_product" ADD CONSTRAINT "FK_64a87f4e01cc2aec274accb218d" FOREIGN KEY ("likeId") REFERENCES "like"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "like_products_product" ADD CONSTRAINT "FK_5fb8a80b127062b3b5964a3d45f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like_products_product" DROP CONSTRAINT "FK_5fb8a80b127062b3b5964a3d45f"`);
        await queryRunner.query(`ALTER TABLE "like_products_product" DROP CONSTRAINT "FK_64a87f4e01cc2aec274accb218d"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_ade458116fb18e52062469c77c0"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_f70b268affe05f6e9df0dab57b0"`);
        await queryRunner.query(`ALTER TABLE "refund" DROP CONSTRAINT "FK_45eba69a2b8b83b63d55daa56a7"`);
        await queryRunner.query(`ALTER TABLE "refund" DROP CONSTRAINT "FK_94c9b30386ff638178cf039a131"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2ecb712377c08a5504e89a25937"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_d4cf70d1131119ae5ef00bde5b5"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_d7ffc97210bc743641768fc1234"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`DROP INDEX "IDX_5fb8a80b127062b3b5964a3d45"`);
        await queryRunner.query(`DROP INDEX "IDX_64a87f4e01cc2aec274accb218"`);
        await queryRunner.query(`DROP TABLE "like_products_product"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "refund"`);
        await queryRunner.query(`DROP TYPE "refund_status_enum"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TYPE "order_item_status_enum"`);
    }

}
