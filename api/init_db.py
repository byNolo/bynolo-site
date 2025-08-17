#!/usr/bin/env python3
"""
Database initialization script for byNolo API
This script creates the database tables and populates them with initial data
"""

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.models import db, Project, SiteStats, HubItem
from datetime import datetime

def init_db():
    """Initialize the database with tables and sample data"""
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        print("✅ Database tables created successfully")
        
        # Check if projects already exist
        if Project.query.count() == 0:
            # Add sample projects based on your current static data
            projects_data = [
                {
                    'title': 'byNolo Portfolio',
                    'description': 'A sleek, modern personal site to showcase all my projects. Built with Vite, Tailwind, and React, with dark mode and smooth animations.',
                    'tech_stack': ['React', 'Vite', 'Tailwind', 'Framer Motion'],
                    'github_url': 'https://github.com/byNolo/bynolo-site',
                    'live_url': 'https://bynolo.com',
                    'featured': True,
                    'status': 'Active',
                    'order_index': 1
                },
                {
                    'title': 'KeyN Authentication',
                    'description': 'Custom authentication system powering login across all byNolo projects. Secure, self-hosted, with session and JWT support.',
                    'tech_stack': ['Auth', 'JWT', 'OAuth2', 'Flask', 'Security'],
                    'github_url': 'https://github.com/byNolo/keyn',
                    'live_url': None,
                    'featured': True,
                    'status': 'Active',
                    'order_index': 2
                },
                {
                    'title': 'SideQuest',
                    'description': 'Gamified daily side quest generator. Personalized quests based on location, preferences, and community ratings.',
                    'tech_stack': ['Flask', 'Gamification', 'Geo', 'Automation'],
                    'github_url': '#',
                    'live_url': None,
                    'featured': False,
                    'status': 'Planning',
                    'order_index': 3
                },
                {
                    'title': 'Vinyl Vote',
                    'description': 'A weekly album rating platform for my friend group. Features user login, stats, charts, and admin dashboard.',
                    'tech_stack': ['Flask', 'Music', 'Voting', 'Charts'],
                    'github_url': 'https://github.com/byNolo/vinyl-vote',
                    'live_url': None,
                    'featured': True,
                    'status': 'Active',
                    'order_index': 4
                }
            ]
            
            for project_data in projects_data:
                project = Project(
                    title=project_data['title'],
                    description=project_data['description'],
                    github_url=project_data['github_url'],
                    live_url=project_data['live_url'],
                    featured=project_data['featured'],
                    status=project_data['status'],
                    order_index=project_data['order_index']
                )
                project.set_tech_stack(project_data['tech_stack'])
                db.session.add(project)
            
            db.session.commit()
            print(f"✅ Added {len(projects_data)} projects to database")
        else:
            print("📋 Projects already exist in database")
        
        # Check if stats already exist
        if SiteStats.query.count() == 0:
            stats_data = [
                {
                    'key': 'years_experience',
                    'value': '3',
                    'description': 'Years of professional development experience'
                },
                {
                    'key': 'technologies',
                    'value': 'Python,JavaScript,React,Flask,Docker,TypeScript',
                    'description': 'Main technologies and tools'
                }
            ]
            
            for stat_data in stats_data:
                stat = SiteStats(**stat_data)
                db.session.add(stat)
            
            db.session.commit()
            print(f"✅ Added {len(stats_data)} statistics to database")
        else:
            print("📊 Statistics already exist in database")
        
        # Check if hub items already exist
        if HubItem.query.count() == 0:
            hub_items_data = [
                {
                    'title': 'Vinyl Vote',
                    'description': 'Weekly album voting platform',
                    'icon': '🎵',
                    'icon_type': 'emoji',
                    'icon_label': 'Musical note',
                    'link': 'https://vinylvote.bynolo.com',
                    'status': 'Live',
                    'categories': ['app', 'service'],
                    'color': 'from-[#1DB954] to-[#1ED760]',
                    'order_index': 1,
                    'featured': True
                },
                {
                    'title': 'KeyN Authentication',
                    'description': 'Secure authentication system powering all byNolo projects',
                    'icon': '🔐',
                    'icon_type': 'emoji', 
                    'icon_label': 'Lock representing security',
                    'link': 'https://keyn.bynolo.com',
                    'status': 'Live',
                    'categories': ['service'],
                    'color': 'from-blue-500 to-blue-600',
                    'order_index': 2,
                    'featured': True
                },
                {
                    'title': 'Portfolio',
                    'description': 'This site - showcasing projects and serving as the central hub',
                    'icon': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                    'icon_type': 'image',
                    'icon_label': 'React logo',
                    'link': '/',
                    'status': 'Active',
                    'categories': ['site'],
                    'color': 'from-green-500 to-green-600',
                    'order_index': 3,
                    'featured': True
                },
                {
                    'title': 'SideQuest',
                    'description': 'Gamified daily adventures and local discovery platform',
                    'icon': '🗺️',
                    'icon_type': 'emoji',
                    'icon_label': 'Map representing adventure',
                    'link': 'https://sidequest.bynolo.com',
                    'status': 'Planning',
                    'categories': ['app', 'tool'],
                    'color': 'from-purple-500 to-purple-600',
                    'order_index': 4,
                    'featured': False
                }
            ]
            
            for item_data in hub_items_data:
                item = HubItem(
                    title=item_data['title'],
                    description=item_data['description'],
                    icon=item_data['icon'],
                    icon_type=item_data['icon_type'],
                    icon_label=item_data['icon_label'],
                    link=item_data['link'],
                    status=item_data['status'],
                    color=item_data['color'],
                    order_index=item_data['order_index'],
                    featured=item_data['featured']
                )
                item.set_categories(item_data['categories'])
                db.session.add(item)
            
            db.session.commit()
            print(f"✅ Added {len(hub_items_data)} hub items to database")
        else:
            print("🎯 Hub items already exist in database")
        
        print("\n🎉 Database initialization completed successfully!")
        print(f"📍 Database location: {app.config['SQLALCHEMY_DATABASE_URI']}")

if __name__ == '__main__':
    init_db()
