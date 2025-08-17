#!/usr/bin/env python3
"""
Simple admin interface for byNolo API
View contact submissions and manage database entries
"""

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.models import db, Project, ContactSubmission, SiteStats, HubItem
from datetime import datetime

def view_contact_submissions():
    """View all contact form submissions"""
    app = create_app()
    
    with app.app_context():
        submissions = ContactSubmission.query.order_by(ContactSubmission.created_at.desc()).all()
        
        if not submissions:
            print("📭 No contact submissions found")
            return
        
        print(f"📧 Found {len(submissions)} contact submissions:\n")
        
        for submission in submissions:
            print(f"ID: {submission.id}")
            print(f"From: {submission.name} <{submission.email}>")
            print(f"Subject: {submission.subject or 'No subject'}")
            print(f"Date: {submission.created_at}")
            print(f"Status: {submission.status}")
            print(f"Message: {submission.message[:100]}{'...' if len(submission.message) > 100 else ''}")
            print("-" * 60)

def view_projects():
    """View all projects"""
    app = create_app()
    
    with app.app_context():
        projects = Project.query.order_by(Project.order_index.asc(), Project.created_at.desc()).all()
        
        print(f"🚀 Found {len(projects)} projects:\n")
        
        for project in projects:
            print(f"ID: {project.id}")
            print(f"Title: {project.title}")
            print(f"Status: {project.status}")
            print(f"Tech Stack: {', '.join(project.get_tech_stack())}")
            print(f"Featured: {'Yes' if project.featured else 'No'}")
            print(f"GitHub: {project.github_url or 'N/A'}")
            print(f"Live URL: {project.live_url or 'N/A'}")
            print("-" * 60)

def view_hub_items():
    """View all hub items"""
    app = create_app()
    
    with app.app_context():
        items = HubItem.query.order_by(HubItem.order_index.asc(), HubItem.created_at.desc()).all()
        
        print(f"🎯 Found {len(items)} hub items:\n")
        
        for item in items:
            print(f"ID: {item.id}")
            print(f"Title: {item.title}")
            print(f"Status: {item.status}")
            print(f"Categories: {', '.join(item.get_categories())}")
            print(f"Featured: {'Yes' if item.featured else 'No'}")
            print(f"Icon: {item.icon} ({item.icon_type})")
            print(f"Link: {item.link}")
            print("-" * 60)

def add_sample_stats():
    """Add some sample statistics"""
    app = create_app()
    
    with app.app_context():
        # Check if stats already exist
        if SiteStats.query.count() > 0:
            print("📊 Statistics already exist")
            return
        
        stats_data = [
            {
                'key': 'years_experience',
                'value': '3',
                'description': 'Years of professional development experience'
            },
            {
                'key': 'total_commits',
                'value': '1250',
                'description': 'Total Git commits across all projects'
            },
            {
                'key': 'technologies',
                'value': 'Python,JavaScript,React,Flask,Docker,TypeScript,PostgreSQL',
                'description': 'Main technologies and tools'
            },
            {
                'key': 'coffee_consumed',
                'value': '∞',
                'description': 'Cups of coffee consumed while coding'
            }
        ]
        
        for stat_data in stats_data:
            stat = SiteStats(**stat_data)
            db.session.add(stat)
        
        db.session.commit()
        print(f"✅ Added {len(stats_data)} statistics")

def main():
    if len(sys.argv) < 2:
        print("byNolo Admin Interface")
        print("Usage: python admin.py [command]")
        print("")
        print("Commands:")
        print("  contacts  - View contact form submissions")
        print("  projects  - View all projects")
        print("  hub       - View all hub items")
        print("  stats     - Add sample statistics")
        return
    
    command = sys.argv[1]
    
    if command == 'contacts':
        view_contact_submissions()
    elif command == 'projects':
        view_projects()
    elif command == 'hub':
        view_hub_items()
    elif command == 'stats':
        add_sample_stats()
    else:
        print(f"Unknown command: {command}")

if __name__ == '__main__':
    main()
