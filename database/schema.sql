create database nem_financial;
use nem_financial;

CREATE TABLE payout_transaction
(
    id INTEGER AUTO_INCREMENT,
    serialized TEXT NOT NULL,
    tx_status VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
) COMMENT='Payout Transactions';

CREATE TABLE asset
(
    id INTEGER AUTO_INCREMENT,
    class_name VARCHAR(20) NOT NULL,
    tx_id INTEGER NOT NULL,
    loan_amount DOUBLE NOT NULL,
    interest_rate DOUBLE NOT NULL,
    interest_amount DOUBLE NOT NULL COMMENT 'Amount of interest to be paid at maturity',
    open_dt DATETIME NOT NULL,
    maturity_dt DATETIME NOT NULL,
    paid_off BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
) COMMENT='Instantiated Assets';
