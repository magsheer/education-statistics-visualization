# -*- coding: utf-8 -*-
"""
Created on Tue Sep 18 23:33:13 2018
@author: gtanv
"""

import csv

with open('data/adult_literacy_rate_gpi.csv', mode='w') as employee_file:
    employee_writer = csv.writer(employee_file, delimiter=',')

    with open('data/EdStatsData.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                employee_writer.writerow(row)
                line_count += 1
            if row[2] == 'Adult literacy rate, population 15+ years, gender parity index (GPI)':
                employee_writer.writerow(row)
                line_count += 1
        print(f'Processed {line_count} lines.')
        
with open('data/adult_literacy_rate_female.csv', mode='w') as employee_file:
    employee_writer = csv.writer(employee_file, delimiter=',')

    with open('data/EdStatsData.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                employee_writer.writerow(row)
                line_count += 1
            if row[2] == 'Adult literacy rate, population 15+ years, female (%)':
                employee_writer.writerow(row)
                line_count += 1
        print(f'Processed {line_count} lines.')
        
with open('data/adult_literacy_rate_male.csv', mode='w') as employee_file:
    employee_writer = csv.writer(employee_file, delimiter=',')

    with open('data/EdStatsData.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                employee_writer.writerow(row)   
                line_count += 1
            if row[2] == 'Adult literacy rate, population 15+ years, male (%)':
                employee_writer.writerow(row)
                line_count += 1
        print(f'Processed {line_count} lines.')


    
